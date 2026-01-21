package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.view.ProofActivity;
import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.contract.ResumerContract;

import java.util.ArrayList;
import java.util.List;

public class ResumerPresenter implements ResumerContract.Presenter {
    private final ResumerContract.View view;
    private Context context;

    private String name;
    private String cpf;
    private String email;
    private String valueReceived;
    private String valueSales;
    private String change;

    private final SalesModel model;

    public ResumerPresenter(ResumerContract.View view, Context context) {
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


        view.printInfo(name, cpf, email, valueReceived, valueSales, change);
    }

    @Override
    public void altResumer() {
        model.setUpdate(true);
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosResumer();
    }

    @Override
    public void finish() {
        Intent intent = new Intent(context, ProofActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosResumer();
    }

    @Override
    public void backResumer() {
        model.setUpdate(false);
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosResumer();
    }
}
