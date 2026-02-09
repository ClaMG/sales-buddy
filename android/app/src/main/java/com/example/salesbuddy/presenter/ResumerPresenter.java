package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.model.ReprocessingModel;
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
    private String telaR = "ReprocessamentoResumer";
    private ReprocessingModel vendaR;



    public ResumerPresenter(ResumerContract.View view, Context context) {
        this.view = view;
        this.context = context;
        this.apiService = RetrofitClient.getClient().create(SalesService.class);
    }

    @Override
    public void getInfo(String name, String cpf, String email, String valueSales,
                        String valueReceived, String change, List<ItemsModel> itens) {

        if (name == null || cpf == null || email == null || valueReceived == null || valueSales == null || change== null ){
            view.mostrarErro(context.getString(R.string.error_missing_fields));
            return ;
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
        vendaR = new ReprocessingModel(name, cpf, email, saleValueDouble, amountReceivedDouble, chageDouble, itens);
    }

    private class SalesCallback implements Callback<SalesModel> {
        @Override
        public void onResponse(Call<SalesModel> call, Response<SalesModel> response) {
            view.mostrarLoading(false);
            if (response.isSuccessful() && response.body() != null) {
                view.mostrarSucesso(tela);
                new android.os.Handler().postDelayed(() -> irParaProof(), 1500);
            } else {
                // Se o servidor deu erro (ex: 400), tentamos salvar como reprocessamento
                Log.w("API_ERROR", context.getString(R.string.log_api_error_reprocessing));
                reprocessing();
            }
        }

        @Override
        public void onFailure(Call<SalesModel> call, Throwable t) {
            Log.e("API_FAILURE", context.getString(R.string.log_api_failure_reprocessing));
            reprocessing();
        }
    }

    private class ReprocessingCallback implements Callback<ReprocessingModel> {
        @Override
        public void onResponse(Call<ReprocessingModel> call, Response<ReprocessingModel> response) {
            view.mostrarLoading(false);
            if (response.isSuccessful()) {
                view.mostrarSucesso(telaR);
                new android.os.Handler().postDelayed(ResumerPresenter.this::irHome, 1500);
            } else {
                String msg = extrairMensagemDeErro(response);
                view.mostrarErro(context.getString(R.string.error_reprocessing_failed, msg));
            }
        }

        @Override
        public void onFailure(Call<ReprocessingModel> call, Throwable t) {
            tratarErroConexao(t);
        }
    }

    public void reprocessing(){
        if (vendaR != null){
            apiService.enviarReprocessing(vendaR).enqueue(new ReprocessingCallback());
        }
    }

    private void tratarErroConexao(Throwable t) {
        String msg;
        if (t instanceof ConnectException) {
            msg = context.getString(R.string.error_connection);
        } else if (t instanceof SocketTimeoutException) {
            msg = context.getString(R.string.error_timeout);
        } else if (t instanceof IOException) {
            msg = context.getString(R.string.error_network);
        } else {
            msg = context.getString(R.string.error_unexpected, t.getMessage());
        }
        view.mostrarErro(msg);
    }

    private String extrairMensagemDeErro(Response<?> response) {
        if (response.errorBody() == null) return context.getString(R.string.error_unknown);

        try {
            String errorJson = response.errorBody().string();
            // Parse manual do JSON para garantir que pegamos apenas o texto da chave "message"
            JsonObject jsonObject = new JsonParser().parse(errorJson).getAsJsonObject();

            if (jsonObject.has("message")) {
                return jsonObject.get("message").getAsString();
            }
            return errorJson;
        } catch (Exception e) {
            return context.getString(R.string.error_parse_json);
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
        view.mostrarLoading(true);
        boolean pagamento = false;//Trocar para o a resposta do pagamento cielo//
        if (venda != null && pagamento == true) {
            apiService.registrarSales(venda).enqueue(new SalesCallback());
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

    private void irParaProof() {
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

    private void irHome(){
        Intent intent = new Intent(context, HomeActivity.class);
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
