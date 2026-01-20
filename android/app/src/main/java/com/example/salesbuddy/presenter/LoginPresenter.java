package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.model.LoginModel;
import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.view.HomeActivity;
import com.example.salesbuddy.view.contract.LoginContract;

public class LoginPresenter implements LoginContract.Presenter {
    private final LoginContract.View view;
    private final LoginModel model;
    private Context context;

    private String Mensage;

    public LoginPresenter(LoginContract.View view, Context context) {
        this.view = view;
        this.model = new LoginModel();
        this.context = context;
    }


    //Verificação do login
    @Override
    public void login(String user, String password) {

        try {
            if (user == null || user.trim().isEmpty() ||
                    password == null || password.trim().isEmpty()) {

                Mensage ="Preencha todos os campos.";
                return;
            }

            model.setUser(user);
            model.setPassword(password);

            Mensage = "Login realizado com sucesso";
            Intent intent = new Intent(context, HomeActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            context.startActivity(intent);
            view.previosLogin();
        }catch (Exception e){
            Mensage = "Erro interno:" + e;
        }

        view.showToastLogin(Mensage);
    }
}
