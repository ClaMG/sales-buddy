package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.ResumerActivity;
import com.example.salesbuddy.view.contract.SplashContract;

public class SplashPresenter implements SplashContract.Presenter {
    private final SplashContract.View view;

    private Context context;
    private String numVersio = "1.01.50";

    public SplashPresenter(SplashContract.View view, Context context) {
        this.view = view;
        this.context = context;
    }

    //Inicia o splash
    @Override
    public void onStart() {
        //logica splash

        view.printVersion(numVersio);

        Intent intent = new Intent(context, ResumerActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosSplash();
    }
}
