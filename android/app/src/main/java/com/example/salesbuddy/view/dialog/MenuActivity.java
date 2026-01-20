package com.example.salesbuddy.view.dialog;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.salesbuddy.R;
import com.example.salesbuddy.presenter.MenuPresenter;
import com.example.salesbuddy.view.contract.MenuContract;

public class MenuActivity extends AppCompatActivity implements MenuContract.View {

    private Button btnMenuLogout, btnMenuRegister, btnMenuReprocessing, btnMenuBack;
    private MenuPresenter presenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_menu);

        //Componentes
        btnMenuLogout = findViewById(R.id.btnMenuLogout);
        btnMenuRegister = findViewById(R.id.btnMenuRegister);
        btnMenuReprocessing = findViewById(R.id.btnMenuReprocessing);
        btnMenuBack = findViewById(R.id.btnMenuBack);
        //Presenter
        presenter = new MenuPresenter(this, getApplicationContext());

        //Eventos
        btnMenuLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

        btnMenuRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

        btnMenuReprocessing.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

        btnMenuBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    @Override
    public void previosMenu() {
        finish();
    }
}