package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.view.HomeActivity;
import com.example.salesbuddy.view.ResumerActivity;
import com.example.salesbuddy.view.adapter.AdpterRegister;
import com.example.salesbuddy.view.contract.RegisterContract;

import java.io.Serializable;
import java.util.List;

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


    public RegisterPresenter(RegisterContract.View view, Context context) {
        this.view = view;
        this.model = new SalesModel();
        this.context = context;
    }

    //Registrar venda
    @Override
    public void register(boolean isUpdate, String name, String cpf, String email, String saleValue, String amountReceived) {
        try {

            if (name.isEmpty() || cpf.isEmpty() || email.isEmpty() || saleValue.isEmpty() || amountReceived.isEmpty()){
                Mensage = "Preencha todos os campos";
                view.showToastRegister(Mensage);
                return;
            }

            saleValueDouble = Double.parseDouble(saleValue);
            amountReceivedDouble = Double.parseDouble(amountReceived);

            change = String.valueOf(amountReceivedDouble - saleValueDouble);


            Intent intent = new Intent(context, ResumerActivity.class);
            intent.putExtra("nome", name);
            intent.putExtra("cpf", cpf);
            intent.putExtra("email", email);
            intent.putExtra("valor_venda", saleValue);
            intent.putExtra("valor_recebido", amountReceived);
            intent.putExtra("troco", change);
            intent.putExtra("itens", (Serializable) listaParaEnviar);
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
            title = "ATUALIZAR VENDA";

            view.update(name, cpf, email, valueReceived, valueSales, title);
        }
    }

    @Override
    public void onMenuButtonClicked() {
        view.showMenuDialog();
    }
}
