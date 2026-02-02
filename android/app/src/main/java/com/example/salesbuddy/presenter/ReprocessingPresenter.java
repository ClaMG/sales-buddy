package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.model.ReprocessingIDsModel;
import com.example.salesbuddy.model.ReprocessingModel;
import com.example.salesbuddy.request.RetrofitClient;
import com.example.salesbuddy.request.SalesService;
import com.example.salesbuddy.view.HomeActivity;
import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.contract.ReprocessingContract;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.net.ConnectException;
import java.net.SocketTimeoutException;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ReprocessingPresenter implements ReprocessingContract.Presenter {
    private final ReprocessingContract.View view;
    private final SalesService apiService;

    private Context context;

    private String tela = "reprocessingSucess";
    private String telaR = "reprocessingError";
    public ReprocessingPresenter(ReprocessingContract.View view, Context context) {
        this.view = view;
        this.context = context;
        this.apiService = RetrofitClient.getClient().create(SalesService.class);
    }

    @Override
    public void onMenuButtonClicked() {
        view.showMenuDialog();
    }

    @Override
    public void getInfo() {
        view.mostrarLoading(true);
        apiService.buscarTodosReprocessamentos().enqueue(new Callback<List<ReprocessingModel>>() {
            @Override
            public void onResponse(Call<List<ReprocessingModel>> call, Response<List<ReprocessingModel>> response) {
                view.mostrarLoading(false);
                if (response.isSuccessful() && response.body() != null) {
                    // Envia a lista para a View abastecer o Adapter
                    List<ReprocessingModel> Info = response.body();
                    view.info(Info);
                    boolean possuiPendentes = false;
                    for (ReprocessingModel item : Info) {
                        if (!item.isStatus()) {
                            possuiPendentes = true;
                            break;
                        }
                    }

                    view.setReprocessButtonEnabled(possuiPendentes);
                } else {
                    view.mostrarErro("Nenhum reprocessamento pendente.");
                }
            }

            @Override
            public void onFailure(Call<List<ReprocessingModel>> call, Throwable t) {
                view.mostrarErro("Erro ao carregar dados: " + t.getMessage());
            }
        });
    }

    @Override
    public void reprocessing(List<ReprocessingModel> listaLocal) {
        view.mostrarLoading(true);
        List<Integer> idsNumericos = new ArrayList<>();

        //Criar um aray de ids
        for (ReprocessingModel item : listaLocal) {
            if (item.getId() != null) {
                idsNumericos.add(item.getId());
            }
        }

        if (idsNumericos.isEmpty()) {
            view.mostrarErro("Nenhum item válido selecionado.");
            return;
        }

        //Gerar json
        ReprocessingIDsModel payload = new ReprocessingIDsModel();
        payload.setIds(idsNumericos);



        apiService.reprocessing(payload).enqueue(new Callback<ReprocessingIDsModel>() {
            @Override
            public void onResponse(Call<ReprocessingIDsModel> call, Response<ReprocessingIDsModel> response) {
                view.mostrarLoading(false);
                if (response.isSuccessful() && response.body() != null) {
                    ReprocessingIDsModel relatorio = response.body();

                    int totalSucesso = (relatorio.getConcluido() != null) ? relatorio.getConcluido().size() : 0;
                    getInfo();
                    if (totalSucesso > 0) {
                        view.success(tela);
                    } else {
                        view.mostrarErro("Nenhum item foi processado pelo servidor.");
                    }
                } else {
                    extrairMensagemDeErro(response);
                }
            }

            @Override
            public void onFailure(Call<ReprocessingIDsModel> call, Throwable t) {
                tratarErroConexao(t);
            }
        });

    }

    private void tratarErroConexao(Throwable t) {
        String msg;
        if (t instanceof ConnectException) {
            msg = "Não foi possível conectar ao servidor. Verifique se ele está ligado.";
        } else if (t instanceof SocketTimeoutException) {
            msg = "O servidor demorou muito para responder.";
        } else if (t instanceof IOException) {
            msg = "Falha de rede. Verifique sua conexão.";
        } else {
            msg = "Erro inesperado: " + t.getMessage();
        }
        view.mostrarErro(msg);
    }

    private String extrairMensagemDeErro(Response<?> response) {
        if (response.errorBody() == null) return "Erro sem corpo de resposta";

        try {
            String errorJson = response.errorBody().string();
            // Parse manual do JSON para garantir que pegamos apenas o texto da chave "message"
            JsonObject jsonObject = new JsonParser().parse(errorJson).getAsJsonObject();

            if (jsonObject.has("message")) {
                return jsonObject.get("message").getAsString();
            }
            return errorJson;
        } catch (Exception e) {
            return "Erro ao processar resposta do servidor";
        }
    }


    @Override
    public void backReprocessing() {
        Intent intent = new Intent(context, HomeActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosReprocessing();
    }
}
