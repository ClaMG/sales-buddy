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

    private Context context;

    public HomePresenter(HomeContract.View view, Context context) {
        this.view = view;
        this.context = context;
    }

    //Encaminhar para outras paginas
    @Override
    public void goSales() {
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.putExtra("IS_UPDATE", "false");
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

    @Override
    public void onMenuButtonClicked() {
        view.showMenuDialog();
    }

}
