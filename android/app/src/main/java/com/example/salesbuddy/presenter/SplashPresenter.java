package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.view.LoginActivity;
import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.ResumerActivity;
import com.example.salesbuddy.view.SplashActivity;
import com.example.salesbuddy.view.contract.SplashContract;

import java.util.logging.Handler;
import java.util.logging.LogRecord;

public class SplashPresenter implements SplashContract.Presenter {
    private final SplashContract.View view;

    private Context context;
    private String numVersio = "1.01.50";//Conseguir esse número

    public SplashPresenter(SplashContract.View view, Context context) {
        this.view = view;
        this.context = context;
    }

    //Inicia o splash
    @Override
    public void onStart() {

    }
}
