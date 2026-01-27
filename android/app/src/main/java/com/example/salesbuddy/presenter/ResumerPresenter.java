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



    public ResumerPresenter(ResumerContract.View view, Context context) {
        this.view = view;
        this.context = context;
        this.apiService = RetrofitClient.getClient().create(SalesService.class);
    }

    @Override
    public void getInfo(String name, String cpf, String email, String valueReceived,
                        String valueSales, String change, List<ItemsModel> itens) {

        if (name == null || cpf == null || email == null || valueReceived == null || valueSales == null || change== null ){
            view.mostrarErro("Não Consegumos localizar a informação de todos os campos");
        }
        view.printInfo(name, cpf, email, valueReceived, valueSales, change);

        String vSales = (valueSales != null) ? valueSales : "0.0";
        String vReceived = (valueReceived != null) ? valueReceived : "0.0";
        String vChange = (change != null) ? change : "0.0";

        Log.d("tag", cpf + "/"+ valueSales+"/" +vSales+"/" + valueReceived +"/" +change+"/"+ vChange);

        double saleValueDouble = Double.parseDouble(vSales.replace(",", "."));
        double amountReceivedDouble = Double.parseDouble(vReceived.replace(",", "."));
        double chageDouble = Double.parseDouble(vChange.replace(",", "."));

        venda = new SalesModel(name, cpf, email, saleValueDouble, amountReceivedDouble, chageDouble, itens);
    }

    private class DefaultCallback implements Callback<SalesModel> {
        @Override
        public void onResponse(Call<SalesModel> call, Response<SalesModel> response) {
            if (response.isSuccessful()) {
                view.mostrarSucesso();
                irParaProof();
            } else {
                String mensagemErro = extrairMensagemDeErro(response);
                view.mostrarErro(mensagemErro);
            }
        }

        @Override
        public void onFailure(Call<SalesModel> call, Throwable t) {
            tratarErroConexao(t);
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
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosResumer();
    }

    @Override
    public void finish() {
        if (venda != null) {
            apiService.registrarSales(venda).enqueue(new ResumerPresenter.DefaultCallback());
            Intent intent = new Intent(context, ProofActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            context.startActivity(intent);
            view.previosResumer();
        } else {
            view.mostrarErro("Dados da venda não carregados. Tente novamente.");
        }
    }

    private void irParaProof() {
        Intent intent = new Intent(context, ProofActivity.class);
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
