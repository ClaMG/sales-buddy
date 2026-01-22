package com.example.salesbuddy.presenter;

import static android.content.Intent.getIntent;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.view.HomeActivity;
import com.example.salesbuddy.view.ResumerActivity;
import com.example.salesbuddy.view.contract.RegisterContract;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegisterPresenter implements RegisterContract.Presenter {
    private final RegisterContract.View view;
    private final SalesModel model;
    private Context context;
    private String Mensage;
    private String change;
    private double saleValueDouble;
    private double amountReceivedDouble;

    private String name;
    private String cpf;
    private String email;
    private String valueReceived;
    private String valueSales;
    private String title;
    private String amount;


    public RegisterPresenter(RegisterContract.View view, Context context) {
        this.view = view;
        this.model = new SalesModel();
        this.context = context;
    }

    //Registrar venda
    @Override
    public void register(boolean isUpdate, String name, String cpf, String email, String saleValue, String amountReceived, List<String> listaDeItens) {
        try {

            saleValueDouble = Double.parseDouble(saleValue);
            amountReceivedDouble = Double.parseDouble(amountReceived);

            change = String.valueOf(amountReceivedDouble - saleValueDouble);

            String itens="";

            amount = String.valueOf(itens.length());


            String jsonString = "{"
                    + "\"nome\": \"" + name + "\","
                    + "\"cpf\": \"" + cpf + "\","
                    + "\"email\": \"" + email + "\","
                    + "\"quantidade\": " + amount + ","
                    + "\"valor_venda\": " + saleValue + ","
                    + "\"valor_recebido\": " + amountReceived + ","
                    + "\"troco\": " + change + ","
                    + "\"itens\": " + itens
                    + "}";


            //create e mensagem

            if(isUpdate){
                //update
            }

            Intent intent = new Intent(context, ResumerActivity.class);
            intent.putExtra("nome", name);
            intent.putExtra("cpf", cpf);
            intent.putExtra("email", email);
            intent.putExtra("quantidade", amount);
            intent.putExtra("valor_venda", saleValue);
            intent.putExtra("valor_recebido", amountReceived);
            intent.putExtra("troco", change);
            //itens
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            context.startActivity(intent);
            view.previosRegister();
        } catch (Exception e) {
            Mensage = "Erro interno"+ e;
        }

        view.showToastRegister(Mensage);
    }

    @Override
    public void backRegister() {
        Intent intent = new Intent(context, HomeActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosRegister();
    }


    @Override
    public void testUpdate(boolean isUpdate, String name, String cpf, String email, String valueReceived, String valueSales) {
        if (isUpdate){
            //atualizar

            title = "ATUALIZAR VENDA";

            view.update(name, cpf, email, valueReceived, valueSales, title);
        }
    }

    @Override
    public void onMenuButtonClicked() {
        view.showMenuDialog();
    }
}
