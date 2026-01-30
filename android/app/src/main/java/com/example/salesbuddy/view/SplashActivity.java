package com.example.salesbuddy.view;

import android.os.Bundle;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.salesbuddy.R;
import com.example.salesbuddy.presenter.SplashPresenter;
import com.example.salesbuddy.view.contract.SplashContract;

public class SplashActivity extends AppCompatActivity implements SplashContract.View {

    private TextView tvVersion;

    private SplashPresenter presenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_splash);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        //Componentes
        tvVersion = findViewById(R.id.tvVersion);
        //Presenter
        presenter = new SplashPresenter(this, getApplicationContext());
        presenter.onStart();
    }

    //Printar a versão
    @Override
    public void printVersion(String numVersion) {
        tvVersion.setText(numVersion);
    }

    //Fechar pagina
    @Override
    public void previosSplash() {
        finish();
    }
}