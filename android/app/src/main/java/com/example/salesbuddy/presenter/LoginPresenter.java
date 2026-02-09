package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.LoginModel;
import com.example.salesbuddy.request.LoginService;
import com.example.salesbuddy.request.RetrofitClient;
import com.example.salesbuddy.view.HomeActivity;
import com.example.salesbuddy.view.contract.LoginContract;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.net.ConnectException;
import java.net.SocketTimeoutException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginPresenter implements LoginContract.Presenter {
    private final LoginContract.View view;
    private Context context;


    public LoginPresenter(LoginContract.View view, Context context) {
        this.view = view;
        this.context = context;
    }


    //Verificação do login
    @Override
    public void login(String user, String password) {
        view.mostrarLoading(true);

        try {
            if (user == null || password == null){
                view.mostrarErro(context.getString(R.string.fillfields));
            }
            LoginModel dados = new LoginModel(user.trim(), password.trim());
            LoginService loginService = RetrofitClient.getClient().create(LoginService.class);

            loginService.fazerLogin(dados).enqueue(new Callback<LoginModel>() {
                @Override
                public void onResponse(Call<LoginModel> call, Response<LoginModel> response) {
                    view.mostrarLoading(false);
                    if (response.isSuccessful() && response.body() != null) {

                        String token = response.body().getToken();
                        irParaHome(token);
                    } else {
                        String mensagemErro = extrairMensagemDeErro(response);
                        Log.e("API_ERROR", "Erro do servidor: " + mensagemErro);
                        view.mostrarErro(mensagemErro);
                    }
                }

                @Override
                public void onFailure(Call<LoginModel> call, Throwable t) {
                    view.mostrarLoading(false);
                    Log.e("API_ERROR", "Mensagem: " + t.getMessage());
                    String msg;
                    if (t instanceof java.net.ConnectException) {
                        msg = context.getString(R.string.error_connection);
                    } else if (t instanceof java.net.SocketTimeoutException) {
                        msg = context.getString(R.string.error_timeout);
                    } else if (t instanceof java.io.IOException) {
                        msg = context.getString(R.string.error_network);
                    } else {
                        msg = context.getString(R.string.error_unexpected, t.getMessage());
                    }
                    view.mostrarErro(msg);

                }
            });


        }catch (Exception e){
            String msg = context.getString(R.string.error_internal, e.getMessage());
            view.mostrarErro(msg);
        }
    }

    private String extrairMensagemDeErro(Response<?> response) {
        if (response.errorBody() == null) return context.getString(R.string.error_unknown);

        try {
            String errorJson = response.errorBody().string();
            // Parse manual do JSON para garantir que pegamos apenas o texto da chave "message"
            JsonObject jsonObject = new JsonParser().parse(errorJson).getAsJsonObject();

            if (jsonObject.has("message")) {
                return jsonObject.get("message").getAsString();
            }
            return errorJson;
        } catch (Exception e) {
            return context.getString(R.string.error_parse_json);
        }
    }


    private void irParaHome(String token) {
        Intent intent = new Intent(context, HomeActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        intent.putExtra("token", token);
        context.startActivity(intent);
        view.previosLogin();
    }
}
