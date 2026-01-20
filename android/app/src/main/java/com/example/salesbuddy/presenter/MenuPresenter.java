package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.model.LoginModel;
import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.view.LoginActivity;
import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.ReprocessingActivity;
import com.example.salesbuddy.view.contract.MenuContract;

public class MenuPresenter implements MenuContract.Presenter {
    private final MenuContract.View view;
    private final SalesModel model;
    private final LoginModel modelLogin;
    private Context context;

    public MenuPresenter(MenuContract.View view, Context context) {
        this.view = view;
        this.context = context;
        this.model = new SalesModel();
        this.modelLogin = new LoginModel();
    }

    @Override
    public void menuRegister() {
        model.setUpdate(false);
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosMenu();
    }

    @Override
    public void menuReprocessing() {
        Intent intent = new Intent(context, ReprocessingActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosMenu();
    }

    @Override
    public void menuLogout() {
        model.setName(null);
        model.setCpf(null);
        model.setEmail(null);
        model.setSale_value(0);
        model.setValue_received(0);
        model.setChange(0);
        model.setUpdate(null);
        model.setId(0);
        model.setItens(null);
        modelLogin.setPassword(null);
        modelLogin.setUser(null);
        
        Intent intent = new Intent(context, LoginActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosMenu();
    }

}
