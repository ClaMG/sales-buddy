package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.util.Patterns;

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
    public void register(String isUpdate, String name, String cpf, String email, String saleValue, String amountReceived, List<ItemsModel> itens) {
        if (name == null || cpf == null || email == null || saleValue == null || amountReceived == null){
            Mensage = "Preencha todos os campos";
            view.showToastRegister(Mensage);
            return;
        }

        if (itens == null) {
            view.showToastRegister("Adicione pelo menos um item à venda");
            return;
        }

        //Verificação de Email
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            view.showToastRegister("Digite um e-mail válido");
            return;
        }

        validarCPF(cpf);

        if (!validarCPF(cpf)) {
            view.showToastRegister("CPF inválido");
            return;
        }

        if (isUpdate == "true"){
            title = "ATUALIZAR VENDA";

            view.update(name, cpf, email, valueReceived, valueSales, title, itens);
        }

        saleValueDouble = Double.parseDouble(saleValue.replace(",", "."));
        amountReceivedDouble = Double.parseDouble(amountReceived.replace(",", "."));

        if (amountReceivedDouble < saleValueDouble) {
            view.showToastRegister("Valor recebido insuficiente");
            return;
        }

        String change = String.format("%.2f", (amountReceivedDouble - saleValueDouble));

        try {

            Intent intent = new Intent(context, ResumerActivity.class);
            intent.putExtra("nome", name);
            intent.putExtra("cpf", cpf);
            intent.putExtra("email", email);
            intent.putExtra("valor_venda", saleValue);
            intent.putExtra("valor_recebido", amountReceived);
            intent.putExtra("troco", change);
            intent.putExtra("itens", (Serializable) itens);
            Log.d("tag", String.valueOf(itens));
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            context.startActivity(intent);
            view.previosRegister();
        } catch (Exception e) {
            Mensage = "Erro interno"+ e;
        }

        view.showToastRegister(Mensage);
    }

    private boolean validarCPF(String cpf) {
        String limpo = cpf.replaceAll("\\D", ""); // Remove máscara

        // Verifica se tem 11 dígitos ou se são todos iguais (ex: 111.111.111-11)
        if (limpo.length() != 11 || limpo.matches("(\\d)\\1{10}")) return false;

        try {
            // Primeiro Dígito
            int soma = 0;
            for (int i = 1; i <= 9; i++) {
                soma += Integer.parseInt(limpo.substring(i - 1, i)) * (11 - i);
            }
            int resto = (soma * 10) % 11;
            if (resto == 10 || resto == 11) resto = 0;
            if (resto != Integer.parseInt(limpo.substring(9, 10))) return false;

            // Segundo Dígito
            soma = 0;
            for (int i = 1; i <= 10; i++) {
                soma += Integer.parseInt(limpo.substring(i - 1, i)) * (12 - i);
            }
            resto = (soma * 10) % 11;
            if (resto == 10 || resto == 11) resto = 0;
            if (resto != Integer.parseInt(limpo.substring(10, 11))) return false;

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public void backRegister() {
        Intent intent = new Intent(context, HomeActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosRegister();
    }

    @Override
    public void onMenuButtonClicked() {
        view.showMenuDialog();
    }
}
