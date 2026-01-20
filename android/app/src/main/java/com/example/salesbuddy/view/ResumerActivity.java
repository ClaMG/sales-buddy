package com.example.salesbuddy.view;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.salesbuddy.R;
import com.example.salesbuddy.presenter.ResumerPresenter;
import com.example.salesbuddy.view.contract.ResumerContract;

public class ResumerActivity extends AppCompatActivity implements ResumerContract.View {

    private TextView tvNameResume,tvCpfResume,tvEmailResume,tvValueReceived,tvValueSales,tvChange;

    private Button btnResumerAlter, btnEnd, btnBackResumer;

    private ResumerPresenter presenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_resumer);

        //Componentes
        tvNameResume = findViewById(R.id.tvNameResume);
        tvCpfResume = findViewById(R.id.tvCpfResume);
        tvEmailResume = findViewById(R.id.tvEmailResume);
        tvValueReceived = findViewById(R.id.tvValueReceived);
        tvValueSales = findViewById(R.id.tvValueSales);
        tvChange = findViewById(R.id.tvCpfResume);
        btnResumerAlter = findViewById(R.id.btnResumerAlter);
        btnEnd = findViewById(R.id.btnEnd);
        btnBackResumer = findViewById(R.id.btnBackResumer);
        //Presenter
        presenter = new ResumerPresenter(this, getApplicationContext());
        //Eventos
        presenter.getInfo();
        btnResumerAlter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.altResumer();
            }
        });
        btnEnd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.finish();
            }
        });
        btnBackResumer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.backResumer();
            }
        });
    }

    //Inserir os dados
    @Override
    public void printInfo(String name, String cpf, String email, String valueReceived, String valueSales, String change) {
        tvNameResume.setText(name);
        tvCpfResume.setText(cpf);
        tvEmailResume.setText(email);
        tvValueReceived.setText(valueReceived);
        tvValueSales.setText(valueSales);
        tvChange.setText(change);
    }

    //Fechar a pagina
    @Override
    public void previosResumer() {
        finish();
    }
}