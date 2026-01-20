package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.view.HomeActivity;
import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.ReprocessingActivity;
import com.example.salesbuddy.view.contract.HomeContract;
import com.example.salesbuddy.view.contract.LoginContract;

public class HomePresenter implements HomeContract.Presenter {

    private final HomeContract.View view;
    private final SalesModel model;


    private Context context;

    public HomePresenter(HomeContract.View view, Context context) {
        this.view = view;
        this.context = context;
        this.model = new SalesModel();
    }

    //Encaminhar para outras paginas
    @Override
    public void goSales() {
        model.setUpdate(false);
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosHome();
    }

    @Override
    public void goReprocess() {
        Intent intent = new Intent(context, ReprocessingActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosHome();
    }

}
