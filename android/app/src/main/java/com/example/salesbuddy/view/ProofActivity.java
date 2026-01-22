package com.example.salesbuddy.view;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.presenter.ProofPresenter;
import com.example.salesbuddy.view.adapter.AdpterProof;
import com.example.salesbuddy.view.contract.ProofContract;
import com.example.salesbuddy.view.dialog.MenuFragment;

import java.util.ArrayList;
import java.util.List;

public class ProofActivity extends AppCompatActivity implements ProofContract.View {

    private TextView tvNameProof,tvCpfProof,tvEmailProof,tvValueReceivedProof,tvValueSalesProof ,tvChangeProof , tvSaleId;
    private Button btnNo, btnYes;
    private ImageButton btnMenuProof,btnBackProof;
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
        btnMenuProof = findViewById(R.id.btnMenuProof);
        //Presenter
        presenter = new ProofPresenter(this, getApplicationContext());

        recyclerViewProof.setNestedScrollingEnabled(false);

        String nome = getIntent().getStringExtra("nome");
        String cpf = getIntent().getStringExtra("cpf");
        String email = getIntent().getStringExtra("email");
        String saleValue = getIntent().getStringExtra("valor_venda");
        String amountReceived = getIntent().getStringExtra("valor_recebido");
        String change = getIntent().getStringExtra("troco");

        //Eventos
        presenter.getInfo(nome,cpf,email, saleValue, amountReceived,change);
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
        btnMenuProof.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.onMenuButtonClicked();
            }
        });

    }

    //Mostra na tela
    @Override
    public void printInfo(String name, String cpf, String email, String valueReceived, String valueSales, String change, String idNum) {
        tvNameProof.setText(name);
        tvCpfProof.setText(cpf);
        tvEmailProof.setText(email);
        tvValueReceivedProof.setText("R$"+valueReceived);
        tvValueSalesProof.setText("R$"+valueSales);
        tvChangeProof.setText("R$"+change);
        tvSaleId.setText("Venda nº" + idNum);

        List<ItemsModel> itens = new ArrayList<>();
        AdpterProof adapter = new AdpterProof(itens);
        recyclerViewProof.setAdapter(adapter);

    }

    //Fechar tela
    @Override
    public void previosProof() {
        finish();
    }

    @Override
    public void showMenuDialog() {
        MenuFragment menu = new MenuFragment();
        menu.show(getSupportFragmentManager(), "menu_dialog");
    }
}