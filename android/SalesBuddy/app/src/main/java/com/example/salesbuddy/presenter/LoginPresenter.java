package com.example.salesbuddy.presenter;

import android.content.Context;

import com.example.salesbuddy.view.contract.LoginContract;

public class LoginPresenter implements LoginContract.Presenter {
    private final LoginContract.View View;
    private String userDb = "erick";
    private String passwordDb= "1234";

    private String Mensage;

    public LoginPresenter(LoginContract.View view, Context context) {
        this.View = view;
    }


    @Override
    public void logintest(String user, String password) {

        try {

            Mensage = "Login realizado com sucesso";

        }catch (Exception e){
            Mensage = "Erro interno:" + e;
        }

        View.showToast(Mensage);
    }
}
