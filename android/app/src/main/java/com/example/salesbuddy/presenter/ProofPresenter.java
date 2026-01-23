package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.request.RetrofitClient;
import com.example.salesbuddy.request.SalesService;
import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.ResumerActivity;
import com.example.salesbuddy.view.adapter.AdpterRegister;
import com.example.salesbuddy.view.contract.ProofContract;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.net.ConnectException;
import java.net.SocketTimeoutException;
import java.util.Collections;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProofPresenter implements ProofContract.Presenter {
    private final ProofContract.View view;
    private Context context;

    private String idNum;

    private SalesService apiService;

    private SalesModel venda;

    public ProofPresenter(ProofContract.View view, Context context) {
        this.view = view;
        this.context = context;
        this.apiService = RetrofitClient.getClient().create(SalesService.class);
    }



    @Override
    public void getInfo(String name, String cpf, String email, String valueReceived,
                        String valueSales, String change, List<ItemsModel> itens) {
        view.printInfo(name, cpf, email, valueReceived, valueSales, change, idNum);

        double saleValueDouble = Double.parseDouble(valueSales);
        double amountReceivedDouble = Double.parseDouble(valueReceived);
        double chageDouble = Double.parseDouble(change);

        venda = new SalesModel(name, cpf, email, saleValueDouble, amountReceivedDouble, chageDouble, itens);
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
    public void no() {
        finalizar();
    }

    @Override
    public void yes() {
        if (venda != null) {

            apiService.emailSales(venda).enqueue(new Callback<SalesModel>() {
                @Override
                public void onResponse(Call<SalesModel> call, Response<SalesModel> response) {
                    if (response.isSuccessful()) {
                        view.mostrarSucessoEmail();
                        finalizar();
                    } else {
                        String mensagemErro = extrairMensagemDeErro(response);
                        view.mostrarErro(mensagemErro);
                    }
                }

                @Override
                public void onFailure(Call<SalesModel> call, Throwable t) {
                    tratarErroConexao(t);
                }
            });
        } else {
            view.mostrarErro("Dados da venda não encontrados.");
        }
    }

    private void finalizar() {
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosProof();
    }

    @Override
    public void backProof() {
        Intent intent = new Intent(context, ResumerActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosProof();
    }

    @Override
    public void onMenuButtonClicked() {
        view.showMenuDialog();
    }
}
