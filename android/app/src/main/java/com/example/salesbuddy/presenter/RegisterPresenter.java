package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.view.HomeActivity;
import com.example.salesbuddy.view.ResumerActivity;
import com.example.salesbuddy.view.contract.RegisterContract;

import java.io.Serializable;
import java.util.List;

public class RegisterPresenter implements RegisterContract.Presenter {
    private final RegisterContract.View view;
    private Context context;
    private double saleValueDouble;
    private double amountReceivedDouble;

    private String title;


    public RegisterPresenter(RegisterContract.View view, Context context) {
        this.view = view;
        this.context = context;
    }

    //Registrar venda
    @Override
    public void register( String name, String cpf, String email, String saleValue, String amountReceived, List<ItemsModel> itens) {
        if (name == null || cpf == null || email == null || saleValue == null || amountReceived == null){
            view.showToastRegister(context.getString(R.string.fillfields));
            return;
        }

        if (itens == null || itens.size() == 0) {
            view.showToastRegister(context.getString(R.string.error_empty_items));
            return;
        }

        //Verificação de Email
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            view.showToastRegister(context.getString(R.string.error_invalid_email));
            return;
        }

        validarCPF(cpf);

        if (!validarCPF(cpf)) {
            view.showToastRegister(context.getString(R.string.error_invalid_cpf));
            return;
        }

        try {
            saleValueDouble = Double.parseDouble(saleValue.replace(",", "."));
            amountReceivedDouble = Double.parseDouble(amountReceived.replace(",", "."));
            if(saleValueDouble <= 0.0){
                view.showToastRegister(context.getString(R.string.error_invalid_sale_value));
                return;
            }

            if (amountReceivedDouble < saleValueDouble ) {
                view.showToastRegister(context.getString(R.string.error_insufficient_amount));
                return;
            }
        } catch (NumberFormatException e) {
            view.showToastRegister(context.getString(R.string.error_parse_json));
            return;
        }


        String change = String.format("%.2f", (amountReceivedDouble - saleValueDouble));


        Intent intent = new Intent(context, ResumerActivity.class);
        intent.putExtra("nome", name);
        intent.putExtra("cpf", cpf);
        intent.putExtra("email", email);
        intent.putExtra("valor_venda", saleValue);
        intent.putExtra("valor_recebido", amountReceived);
        intent.putExtra("troco", change);
        intent.putExtra("itens", (Serializable) itens);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosRegister();

    }

    private boolean validarCPF(String cpf) {
        //Valida o formato visual
        if (cpf == null || !cpf.matches("\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}")) {
            return false;
        }

        // Remove a máscara
        String limpo = cpf.replaceAll("\\D", "");

        // Verifica se tem 11 dígitos
        if (limpo.length() != 11 || limpo.matches("(\\d)\\1{10}")) {
            return false;
        }

        try {
            // Primeiro Dígito
            int soma = 0;
            for (int i = 1; i <= 9; i++) {
                soma += Character.getNumericValue(limpo.charAt(i - 1)) * (11 - i);
            }
            int resto = (soma * 10) % 11;
            if (resto == 10 || resto == 11) resto = 0;
            if (resto != Character.getNumericValue(limpo.charAt(9))) return false;

            // Segundo Dígito
            soma = 0;
            for (int i = 1; i <= 10; i++) {
                soma += Character.getNumericValue(limpo.charAt(i - 1)) * (12 - i);
            }
            resto = (soma * 10) % 11;
            if (resto == 10 || resto == 11) resto = 0;
            if (resto != Character.getNumericValue(limpo.charAt(10))) return false;

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

    @Override
    public void updateconfirm(boolean isUpdate,String name, String cpf, String email, String saleValue, String amountReceived, List<ItemsModel> itens ) {
        if (isUpdate){
            title = context.getString(R.string.title_update_sale);

            view.update(name, cpf, email, saleValue, amountReceived, title, itens);

        }
    }
}
