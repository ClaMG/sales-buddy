package com.example.salesbuddy.view;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.presenter.ResumerPresenter;
import com.example.salesbuddy.view.adapter.AdpterResumer;
import com.example.salesbuddy.view.contract.ResumerContract;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ResumerActivity extends AppCompatActivity implements ResumerContract.View {

    private TextView tvNameResume,tvCpfResume,tvEmailResume,tvValueReceived,tvValueSales,tvChange;

    private Button btnResumerAlter, btnEnd, btnBackResumer;
    private RecyclerView recyclerViewResumer;

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
        recyclerViewResumer = findViewById(R.id.recyclerViewResumer);
        //Presenter
        presenter = new ResumerPresenter(this, getApplicationContext());

        recyclerViewResumer.setNestedScrollingEnabled(false);

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

        List<ItemsModel> itens = new ArrayList<>();
        AdpterResumer adapter = new AdpterResumer(itens);
        recyclerViewResumer.setAdapter(adapter);

    }

    //Fechar a pagina
    @Override
    public void previosResumer() {
        finish();
    }
}