package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.request.RetrofitClient;
import com.example.salesbuddy.request.SalesService;
import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.ResumerActivity;
import com.example.salesbuddy.view.contract.ProofContract;
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

public class ProofPresenter implements ProofContract.Presenter {
    private final ProofContract.View view;
    private Context context;
    private SalesService apiService;

    private SalesModel venda;

    private String tela= "email";

    private String namePresenter;
    private String cpfPresenter;
    private String emailPresenter;
    private String valueReceivedPresenter;
    private String valueSalesPresenter;
    private String changePresenter;
    private List<ItemsModel> itensPresenter;

    public ProofPresenter(ProofContract.View view, Context context) {
        this.view = view;
        this.context = context;
        this.apiService = RetrofitClient.getClient().create(SalesService.class);
    }



    @Override
    public void getInfo(String name, String cpf, String email, String valueReceived,
                        String valueSales, String change, List<ItemsModel> itens) {
        if (name == null || cpf == null || email == null || valueReceived == null || valueSales == null || change== null ){
            view.mostrarErro("Não Consegumos localizar a informação de todos os campos");
            return;
        }

        String vSales = (valueSales != null) ? valueSales : "0.0";
        String vReceived = (valueReceived != null) ? valueReceived : "0.0";
        String vChange = (change != null) ? change : "0.0";

        Log.d("tag", cpf + "/"+ valueSales+"/" +vSales+"/" + valueReceived +"/" +change+"/"+ vChange+ "/"+ itens);

        double saleValueDouble = Double.parseDouble(vSales.replace(",", "."));
        double amountReceivedDouble = Double.parseDouble(vReceived.replace(",", "."));
        double chageDouble = Double.parseDouble(vChange.replace(",", "."));

        namePresenter = name;
        cpfPresenter = cpf;
        emailPresenter = email;
        valueReceivedPresenter= valueReceived;
        valueSalesPresenter = valueSales;
        changePresenter = change;
        itensPresenter = itens;

        venda = new SalesModel(name, cpf, email, amountReceivedDouble,saleValueDouble,
                chageDouble, itens);

        apiService.getSales(venda).enqueue(new Callback<SalesModel>() {
            @Override
            public void onResponse(Call<SalesModel> call, Response<SalesModel> response) {
                if (response.isSuccessful() && response.body() != null) {
                    SalesModel vendaRecebida = response.body();
                    Integer idGerado = vendaRecebida.getId();

                    Log.d("API_SUCCESS", "Venda salva com ID: " + idGerado);

                    String idString = String.valueOf(idGerado);

                    view.printInfo(name, cpf, email,valueSales, valueReceived,
                            change, idString, itens);


                    venda = new SalesModel(idGerado, name, cpf, email, amountReceivedDouble,saleValueDouble,
                            chageDouble, itens);

                } else {
                    view.mostrarErro("Venda não encontrada no servidor.");

                    view.printInfo(name, cpf, email, valueSales, valueReceived,
                            change, null, itens);
                }
            }

            @Override
            public void onFailure(Call<SalesModel> call, Throwable t) {
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
    public void no() {
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosProof();
    }

    @Override
    public void yes() {
        if (venda != null) {

            Log.d("TAG", "yes: "+ venda);

            apiService.emailSales(venda).enqueue(new Callback<SalesModel>() {
                @Override
                public void onResponse(Call<SalesModel> call, Response<SalesModel> response) {
                    if (response.isSuccessful()) {
                        Intent intent = new Intent(context, RegisterActivity.class);
                        intent.putExtra("tela", tela);
                        intent.putExtra("email", venda.email);

                        view.mostrarSucesso();
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
        intent.putExtra("nome", namePresenter);
        intent.putExtra("cpf", cpfPresenter);
        intent.putExtra("email", emailPresenter);
        intent.putExtra("valor_venda", valueSalesPresenter);
        intent.putExtra("valor_recebido", valueReceivedPresenter);
        intent.putExtra("troco", changePresenter);
        intent.putExtra("itens", (Serializable) itensPresenter);
        context.startActivity(intent);
        view.previosProof();
    }

    @Override
    public void onMenuButtonClicked() {
        view.showMenuDialog();
    }
}
