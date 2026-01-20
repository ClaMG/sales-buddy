package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.ResumerActivity;
import com.example.salesbuddy.view.contract.ProofContract;

public class ProofPresenter implements ProofContract.Presenter {
    private final ProofContract.View view;
    private Context context;

    private String name;
    private String cpf;
    private String email;
    private String valueReceived;
    private String valueSales;
    private String change;
    private String idNum;
    private final SalesModel model;


    public ProofPresenter(ProofContract.View view, Context context) {
        this.view = view;
        this.context = context;
        this.model = new SalesModel();
    }

    @Override
    public void getInfo() {
        name = model.getName();
        cpf = model.getCpf();
        email = model.getEmail();
        valueReceived = String.valueOf(model.getValue_received());
        valueSales = String.valueOf(model.getSale_value());
        change = String.valueOf(model.getChange());
        idNum = String.valueOf(model.getId());

        //trocar para pegar do banco de dados


        view.printInfo(name, cpf, email, valueReceived, valueSales, change, idNum);
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
        //enviar por email
    }

    @Override
    public void backProof() {
        Intent intent = new Intent(context, ResumerActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosProof();
    }
}
