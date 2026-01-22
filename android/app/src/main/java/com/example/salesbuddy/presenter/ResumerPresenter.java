package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.view.ProofActivity;
import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.contract.ResumerContract;

import java.util.ArrayList;
import java.util.List;

public class ResumerPresenter implements ResumerContract.Presenter {
    private final ResumerContract.View view;
    private Context context;

    public ResumerPresenter(ResumerContract.View view, Context context) {
        this.view = view;
        this.context = context;
    }

    @Override
    public void getInfo(String name, String cpf, String email, String valueReceived, String valueSales, String change) {
        view.printInfo(name, cpf, email, valueReceived, valueSales, change);
    }

    @Override
    public void altResumer() {
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.putExtra("IS_UPDATE", true);
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
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.putExtra("IS_UPDATE", false);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosResumer();
    }

    @Override
    public void onMenuButtonClicked() {
        view.showMenuDialog();
    }
}
