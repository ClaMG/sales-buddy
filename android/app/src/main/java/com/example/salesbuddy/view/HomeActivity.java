package com.example.salesbuddy.view;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.salesbuddy.R;
import com.example.salesbuddy.presenter.HomePresenter;
import com.example.salesbuddy.presenter.LoginPresenter;
import com.example.salesbuddy.view.contract.HomeContract;
import com.example.salesbuddy.view.contract.LoginContract;
import com.example.salesbuddy.view.dialog.MenuActivity;

public class HomeActivity extends AppCompatActivity implements HomeContract.View {

    private Button btnSales, btnReprocess;
    private ImageButton btnMenuHome;

    private HomePresenter presenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_home);

        //Componentes
        btnSales = findViewById(R.id.btnSales);
        btnReprocess = findViewById(R.id.btnReprocess);
        btnMenuHome = findViewById(R.id.btnMenuHome);
        //Presenter
        presenter = new HomePresenter(this, getApplicationContext());

        //Eventos
        btnSales.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.goSales();
            }
        });

        btnReprocess.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.goReprocess();
            }
        });
        btnMenuHome.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.onMenuButtonClicked();
            }
        });
    }

    //Fechar pagina
    @Override
    public void previosHome() {
        finish();
    }

    @Override
    public void showMenuDialog() {
        Intent intent = new Intent(this, MenuActivity.class);
        startActivity(intent);
    }

}