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
    public void register(boolean isUpdate, String name, String cpf, String email, String saleValue, String amountReceived, List<ItemsModel> itens) {
        if (name.isEmpty() || cpf.isEmpty() || email.isEmpty() || saleValue.isEmpty() || amountReceived.isEmpty() || itens.isEmpty()){
            Mensage = "Preencha todos os campos";
            view.showToastRegister(Mensage);
            return;
        }

        if (itens == null || itens.isEmpty() || itens.get(0).getDescricao().trim().isEmpty()) {
            view.showToastRegister("Adicione pelo menos um item à venda");
            return;
        }

        //Verificação de Email
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            view.showToastRegister("Digite um e-mail válido");
            return;
        }

        String cpfLimpo = cpf.replaceAll("\\D", ""); // Remove tudo que não for número
        if (cpfLimpo.length() != 11) {
            view.showToastRegister("O CPF deve conter 11 números");
            return;
        }

        // 4. Formatação Visual (Adiciona pontos e traço)
        String cpfFormatado = String.format("%s.%s.%s-%s",
                cpfLimpo.substring(0, 3),
                cpfLimpo.substring(3, 6),
                cpfLimpo.substring(6, 9),
                cpfLimpo.substring(9, 11));

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
            intent.putExtra("cpf", cpfFormatado);
            intent.putExtra("email", email);
            intent.putExtra("valor_venda", saleValue);
            intent.putExtra("valor_recebido", amountReceived);
            intent.putExtra("troco", change);
            intent.putExtra("itens", (Serializable) itens);
            Log.d("RegisterPresenter", String.valueOf(itens));
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            context.startActivity(intent);
            view.previosRegister();
        } catch (Exception e) {
            Mensage = "Erro interno"+ e;
        }

        view.showToastRegister(Mensage);
    }

    private boolean isCPFValido(String cpf) {
        //Limpa e verifica tamanho
        cpf = cpf.replaceAll("\\D", "");
        if (cpf.length() != 11 || cpf.matches("(\\d)\\1{10}")) return false;

        try {
            // Cálculo do 1º Dígito
            int soma = 0;
            for (int i = 0; i < 9; i++) soma += (cpf.charAt(i) - '0') * (10 - i);
            int digito1 = 11 - (soma % 11);
            if (digito1 > 9) digito1 = 0;

            // Cálculo do 2º Dígito
            soma = 0;
            for (int i = 0; i < 10; i++) soma += (cpf.charAt(i) - '0') * (11 - i);
            int digito2 = 11 - (soma % 11);
            if (digito2 > 9) digito2 = 0;

            // Verifica se os dígitos calculados batem com os digitados
            return (cpf.charAt(9) - '0') == digito1 && (cpf.charAt(10) - '0') == digito2;

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
