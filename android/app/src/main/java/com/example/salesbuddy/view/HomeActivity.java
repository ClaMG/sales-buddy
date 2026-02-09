package com.example.salesbuddy.view;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.salesbuddy.R;
import com.example.salesbuddy.presenter.HomePresenter;
import com.example.salesbuddy.view.contract.HomeContract;

import com.example.salesbuddy.view.dialog.MenuFragment;

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
        btnSales.setOnClickListener(v -> {presenter.goSales();});

        btnReprocess.setOnClickListener(v -> {presenter.goReprocess();});

        btnMenuHome.setOnClickListener(v -> {presenter.onMenuButtonClicked();});
    }

    //Fechar pagina
    @Override
    public void previosHome() {
        finish();
    }

    @Override
    public void showMenuDialog() {
        MenuFragment menu = new MenuFragment();
        menu.show(getSupportFragmentManager(), "menu_dialog");
    }

}