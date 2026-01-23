package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.example.salesbuddy.model.LoginModel;
import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.request.LoginService;
import com.example.salesbuddy.request.RetrofitClient;
import com.example.salesbuddy.view.HomeActivity;
import com.example.salesbuddy.view.contract.LoginContract;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

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

            LoginModel dados = new LoginModel(user, password);
            LoginService loginService = RetrofitClient.getClient().create(LoginService.class);

            loginService.fazerLogin(dados).enqueue(new Callback<LoginModel>() {
                @Override
                public void onResponse(Call<LoginModel> call, Response<LoginModel> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        String token = response.body().getToken();
                        Intent intent = new Intent(context, HomeActivity.class);
                        intent.putExtra("token", token);
                    } else {
                        // Aqui captura o "error.message" enviado pelo seu catch (error) no Node
                        view.mostrarErro("Usuário ou senha inválidos");
                    }
                }

                @Override
                public void onFailure(Call<LoginModel> call, Throwable t) {
                    view.mostrarErro("Falha na conexão");
                }
            });


            new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(() -> {
                Intent intent = new Intent(context, HomeActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                context.startActivity(intent);
                view.previosLogin();
            }, 1000);
        }catch (Exception e){
            view.mostrarErro("Erro interno:" + e);
        }
    }
}
