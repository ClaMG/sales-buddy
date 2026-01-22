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
    private double change;
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
    public void register(String name, String cpf, String email, String saleValue, String amountReceived, List<ItemsModel> listaDeItens) {
        //Para verificar email
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);

        Log.d("SOS", name + "/"+ cpf+ "/"+email+"/"+saleValue+"/"+amountReceived +"/"+ model.getItemList() +"/"+ listaDeItens);

        try {

            if (name == null || name.trim().isEmpty() ||
                    cpf == null || cpf.trim().isEmpty() ||
                    email == null || email.trim().isEmpty() ||
                    saleValue.trim().isEmpty() || amountReceived.trim().isEmpty()) {

                Mensage ="Preencha todos os campos.";
                view.showToastRegister(Mensage);
                return;
            }

            if(listaDeItens ==null || listaDeItens.isEmpty()){
                Mensage ="Preencha no minimo 1 item.";
                view.showToastRegister(Mensage);
                return;
            }

            saleValueDouble = Double.parseDouble(saleValue);
            amountReceivedDouble = Double.parseDouble(amountReceived);

            change = amountReceivedDouble - saleValueDouble;
            Log.d("SOS", amountReceivedDouble + "/"+ saleValueDouble+ "/"+change+"/");


            if (cpf.length() != 11) {
                Mensage = "Formato do CPF inválido.";
                view.showToastRegister(Mensage);
                return;
            }

            cpf = cpf.replaceAll("[^0-9]", "");

            Matcher matcher = pattern.matcher(email);
            if (!matcher.matches()) {
                Mensage ="Formato do email invalido.";
                view.showToastRegister(Mensage);
                return;
            }

            if (saleValueDouble> amountReceivedDouble){
                Mensage ="Valor de venda não foi pago.";
                view.showToastRegister(Mensage);
                return;
            }

            model.setName(name);
            model.setCpf(cpf);
            model.setEmail(email);
            model.setSale_value(saleValueDouble);
            model.setValue_received(amountReceivedDouble);
            model.setChange(change);


            Mensage = "Venda registrada com sucesso";
            view.showToastRegister(Mensage);

            Intent intent = new Intent(context, ResumerActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            context.startActivity(intent);
            view.previosRegister();
        } catch (Exception e) {
            Mensage = "Erro interno"+ e;
            view.showToastRegister(Mensage);
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
    public void testUpdate(boolean isUpdate) {
        if (isUpdate){
            name = model.getName();
            cpf = model.getCpf();
            email = model.getEmail();
            valueReceived = String.valueOf(model.getValue_received());
            valueSales = String.valueOf(model.getSale_value());
            title = "ATUALIZAR VENDA";

            view.update(name, cpf, email, valueReceived, valueSales, title);
        }
    }

    @Override
    public void onMenuButtonClicked() {
        view.showMenuDialog();
    }
}
