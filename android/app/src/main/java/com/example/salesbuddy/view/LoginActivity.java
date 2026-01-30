package com.example.salesbuddy.view;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.salesbuddy.R;
import com.example.salesbuddy.presenter.LoginPresenter;
import com.example.salesbuddy.view.contract.LoginContract;
import com.google.gson.annotations.SerializedName;

public class LoginActivity extends AppCompatActivity implements LoginContract.View {

    private EditText txUser, txPassword;
    private Button btnLogin;

    private ProgressBar progressBarLogin;

    private LoginPresenter presenter;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login);

        //Componentes
        txPassword = findViewById(R.id.txPassword);
        txUser = findViewById(R.id.txUser);
        btnLogin = findViewById(R.id.btnLogin);
        progressBarLogin = findViewById(R.id.progressBarLogin);

        //Presenter
        presenter = new LoginPresenter(this, getApplicationContext());


        //Eventos
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String user = txUser.getText().toString().trim();
                String password = txPassword.getText().toString().trim();
                presenter.login(user, password);
            }
        });
    }

    //Aparecer a mensagem no toast
    @Override
    public void mostrarErro(String menssage) {
        new AlertDialog.Builder(this)
                .setTitle("Ops! Algo deu errado")
                .setMessage(menssage)
                .setPositiveButton("OK", null)
                .show();
    }

    //Fechar pagina
    @Override
    public void previosLogin() {
        finish();
    }

    @Override
    public void mostrarLoading(boolean exibir) {
        if (exibir) {
            progressBarLogin.setVisibility(View.VISIBLE);
        } else {
            progressBarLogin.setVisibility(View.GONE);
        }
    }
}