package com.example.salesbuddy.view;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.salesbuddy.R;
import com.example.salesbuddy.presenter.LoginPresenter;
import com.example.salesbuddy.view.contract.LoginContract;

public class LoginActivity extends AppCompatActivity implements LoginContract.View {

    private EditText txUser, txPassword;
    private Button btnLogin;

    private LoginPresenter presenter;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login);

        txPassword = findViewById(R.id.txPassword);
        txUser = findViewById(R.id.txUser);
        btnLogin = findViewById(R.id.btnLogin);

        //Presenter
        presenter = new LoginPresenter(this, getApplicationContext());

        String user = String.valueOf(txUser.getText());
        String password = String.valueOf(txPassword.getText());

        //Eventos
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.logintest(user, password);
            }
        });
    }

    @Override
    public void showToast(String message) {
        //toast
    }
}