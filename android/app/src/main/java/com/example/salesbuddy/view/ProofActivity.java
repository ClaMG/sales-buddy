package com.example.salesbuddy.view;

import android.os.Bundle;
import android.text.Layout;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.presenter.ProofPresenter;
import com.example.salesbuddy.view.adapter.AdpterProof;
import com.example.salesbuddy.view.adapter.AdpterResumer;
import com.example.salesbuddy.view.contract.ProofContract;

import java.util.ArrayList;
import java.util.List;

public class ProofActivity extends AppCompatActivity implements ProofContract.View {

    private TextView tvNameProof,tvCpfProof,tvEmailProof,tvValueReceivedProof,tvValueSalesProof ,tvChangeProof , tvSaleId;
    private Button btnNo, btnYes, btnBackProof;
    private RecyclerView recyclerViewProof;
    private ProofPresenter presenter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_proof);

        //Componentes
        tvNameProof = findViewById(R.id.tvNameProof);
        tvCpfProof = findViewById(R.id.tvCpfProof);
        tvEmailProof = findViewById(R.id.tvEmailProof);
        tvValueReceivedProof = findViewById(R.id.tvValueReceivedProof);
        tvValueSalesProof = findViewById(R.id.tvValueSalesProof);
        tvChangeProof = findViewById(R.id.tvChangeProof);
        tvSaleId = findViewById(R.id.tvSaleId);
        btnNo = findViewById(R.id.btnNo);
        btnYes = findViewById(R.id.btnYes);
        btnBackProof = findViewById(R.id.btnBackProof);
        recyclerViewProof =findViewById(R.id.recyclerViewProof);
        //Presenter
        presenter = new ProofPresenter(this, getApplicationContext());

        recyclerViewProof.setNestedScrollingEnabled(false);

        //Eventos
        presenter.getInfo();
        btnYes.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.yes();
            }
        });
        btnNo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.no();
            }
        });
        btnBackProof.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.backProof();
            }
        });

    }

    //Mostra na tela
    @Override
    public void printInfo(String name, String cpf, String email, String valueReceived, String valueSales, String change, String idNum) {
        tvNameProof.setText(name);
        tvCpfProof.setText(cpf);
        tvEmailProof.setText(email);
        tvValueReceivedProof.setText(valueReceived);
        tvValueSalesProof.setText(valueSales);
        tvChangeProof.setText(change);
        tvSaleId.setText(idNum);

        List<ItemsModel> itens = new ArrayList<>();
        AdpterProof adapter = new AdpterProof(itens);
        recyclerViewProof.setAdapter(adapter);

    }

    //Fechar tela
    @Override
    public void previosProof() {
        finish();
    }
}