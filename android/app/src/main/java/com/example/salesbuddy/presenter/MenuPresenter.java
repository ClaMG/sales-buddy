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
    private Context context;

    public MenuPresenter(MenuContract.View view, Context context) {
        this.view = view;
        this.context = context;
    }

    @Override
    public void menuRegister() {
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.putExtra("IS_UPDATE", false);
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
        
        Intent intent = new Intent(context, LoginActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosMenu();
    }

}
