package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.request.RetrofitClient;
import com.example.salesbuddy.request.SalesService;
import com.example.salesbuddy.view.HomeActivity;
import com.example.salesbuddy.view.ProofActivity;
import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.contract.ResumerContract;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.io.Serializable;
import java.net.ConnectException;
import java.net.SocketTimeoutException;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ResumerPresenter implements ResumerContract.Presenter {
    private final ResumerContract.View view;
    private Context context;
    private SalesModel venda;
    private SalesService apiService;

    private String namePresenter;
    private String cpfPresenter;
    private String emailPresenter;
    private String valueReceivedPresenter;
    private String valueSalesPresenter;
    private String changePresenter;
    private List<ItemsModel> itensPresenter;

    private String tela = "Resumer";



    public ResumerPresenter(ResumerContract.View view, Context context) {
        this.view = view;
        this.context = context;
        this.apiService = RetrofitClient.getClient().create(SalesService.class);
    }

    @Override
    public void getInfo(String name, String cpf, String email, String valueSales,
                        String valueReceived, String change, List<ItemsModel> itens) {

        if (name == null || cpf == null || email == null || valueReceived == null || valueSales == null || change== null ){
            view.mostrarErro("Não Consegumos localizar a informação de todos os campos");
        }

        namePresenter = name;
        cpfPresenter = cpf;
        emailPresenter = email;
        valueReceivedPresenter= valueReceived;
        valueSalesPresenter = valueSales;
        changePresenter = change;
        itensPresenter = itens;

        view.printInfo(name, cpf, email,valueSales, valueReceived, change);

        String vSales = (valueSales != null) ? valueSales : "0.0";
        String vReceived = (valueReceived != null) ? valueReceived : "0.0";
        String vChange = (change != null) ? change : "0.0";

        double saleValueDouble = Double.parseDouble(vSales.replace(",", "."));
        double amountReceivedDouble = Double.parseDouble(vReceived.replace(",", "."));
        double chageDouble = Double.parseDouble(vChange.replace(",", "."));

        venda = new SalesModel(name, cpf, email, saleValueDouble, amountReceivedDouble, chageDouble, itens);
    }

    private class DefaultCallback implements Callback<SalesModel> {
        private final boolean isReprocessingAttempt;

        // Construtor que define se esta chamada já é a de recuperação
        public DefaultCallback(boolean isReprocessing) {
            this.isReprocessingAttempt = isReprocessing;
        }

        @Override
        public void onResponse(Call<SalesModel> call, Response<SalesModel> response) {
            if (response.isSuccessful() && response.body() != null) {
                SalesModel vendaSalva = response.body();
                view.mostrarSucesso();

                // Delay de 2 segundos para o usuário ver o feedback visual
                new android.os.Handler().postDelayed(() -> irParaProof(vendaSalva), 2000);

            } else {
                // Extrai a mensagem de erro vinda do servidor (Node.js)
                String mensagemErro = extrairMensagemDeErro(response);

                if (!isReprocessingAttempt) {
                    // Se falhou na primeira vez, tentamos o reprocessamento
                    reprocessing();
                } else {
                    // Se falhou até no reprocessamento, desistimos e avisamos o usuário
                    view.mostrarErro("Erro persistente: " + mensagemErro);
                }
            }
        }

        @Override
        public void onFailure(Call<SalesModel> call, Throwable t) {
            if (!isReprocessingAttempt) {
                Log.e("API_RETRY", "Erro de conexão. Tentando reprocessar...");
                reprocessing();
            } else {
                // Falha total de conexão após reprocessar
                tratarErroConexao(t);
            }
        }
    }

    public void reprocessing(){
        if (venda != null){
            apiService.enviarReprocessing(venda).enqueue(new ResumerPresenter.DefaultCallback(true));
        }
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
    public void altResumer() {
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.putExtra("IS_UPDATE", "true");
        intent.putExtra("nome", namePresenter);
        intent.putExtra("cpf", cpfPresenter);
        intent.putExtra("email", emailPresenter);
        intent.putExtra("valor_venda", valueSalesPresenter);
        intent.putExtra("valor_recebido", valueReceivedPresenter);
        intent.putExtra("troco", changePresenter);
        intent.putExtra("itens", (Serializable) itensPresenter);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosResumer();
    }


    @Override
    public void finish() {
        boolean pagamento = true;
        if (venda != null && pagamento == true) {
            apiService.registrarSales(venda).enqueue(new ResumerPresenter.DefaultCallback(false));
        } else {
            String vSales = (valueSalesPresenter != null) ? valueSalesPresenter : "0.0";
            String vReceived = (valueReceivedPresenter != null) ? valueReceivedPresenter : "0.0";
            String vChange = (changePresenter != null) ? changePresenter : "0.0";

            double saleValueDouble = Double.parseDouble(vSales.replace(",", "."));
            double amountReceivedDouble = Double.parseDouble(vReceived.replace(",", "."));
            double chageDouble = Double.parseDouble(vChange.replace(",", "."));

            venda = new SalesModel(namePresenter, cpfPresenter, emailPresenter, saleValueDouble, amountReceivedDouble, chageDouble, itensPresenter);
            reprocessing();
        }
    }

    private void irParaProof(SalesModel vendaFinal) {
        Intent intent = new Intent(context, ProofActivity.class);
        intent.putExtra("nome", namePresenter);
        intent.putExtra("cpf", cpfPresenter);
        intent.putExtra("email", emailPresenter);
        intent.putExtra("valor_venda", valueSalesPresenter);
        intent.putExtra("valor_recebido", valueReceivedPresenter);
        intent.putExtra("troco", changePresenter);
        intent.putExtra("itens", (Serializable) itensPresenter);

        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosResumer();
    }
    @Override
    public void backResumer() {
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.putExtra("IS_UPDATE", "false");
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosResumer();
    }

    @Override
    public void onMenuButtonClicked() {
        view.showMenuDialog();
    }
}
