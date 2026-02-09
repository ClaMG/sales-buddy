package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.R;
import com.example.salesbuddy.view.LoginActivity;
import com.example.salesbuddy.view.contract.SplashContract;


public class SplashPresenter implements SplashContract.Presenter {
    private final SplashContract.View view;

    private Context context;

    public SplashPresenter(SplashContract.View view, Context context) {
        this.view = view;
        this.context = context;
    }

    //Inicia o splash
    @Override
    public void onStart() {
        view.printVersion(context.getString(R.string.tvVersionNum));
        new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(() -> {
            Intent intent = new Intent(context, LoginActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            context.startActivity(intent);
            view.previosSplash();
        }, 3000);
    }
    
    
}
