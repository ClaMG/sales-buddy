package com.example.salesbuddy.view;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.presenter.ResumerPresenter;
import com.example.salesbuddy.view.adapter.AdpterResumer;
import com.example.salesbuddy.view.contract.ResumerContract;
import com.example.salesbuddy.view.dialog.MenuFragment;

import java.util.ArrayList;
import java.util.List;

public class ResumerActivity extends AppCompatActivity implements ResumerContract.View {

    private TextView tvNameResume,tvCpfResume,tvEmailResume,tvValueReceived,tvValueSales,tvChange;

    private Button btnResumerAlter;
    private RecyclerView recyclerViewResumer;

    private ImageButton btnMenuResumer, btnBackResumer;
    private View btnEnd;

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
        tvChange = findViewById(R.id.tvChange);
        btnResumerAlter = findViewById(R.id.btnResumerAlter);
        btnEnd = findViewById(R.id.btnEnd);
        btnBackResumer = findViewById(R.id.btnBackResumer);
        recyclerViewResumer = findViewById(R.id.recyclerViewResumer);
        btnMenuResumer = findViewById(R.id.btnMenuResumer);
        //Presenter
        presenter = new ResumerPresenter(this, getApplicationContext());

        String nome = getIntent().getStringExtra("nome");
        String cpf = getIntent().getStringExtra("cpf");
        String email = getIntent().getStringExtra("email");
        String saleValue = getIntent().getStringExtra("valor_venda");
        String amountReceived = getIntent().getStringExtra("valor_recebido");
        String change = getIntent().getStringExtra("troco");
        List<ItemsModel> item = (List<ItemsModel>) getIntent().getSerializableExtra("itens");

        recyclerViewResumer.setNestedScrollingEnabled(false);
        recyclerViewResumer.setLayoutManager(new LinearLayoutManager(this));

        AdpterResumer adapter = new AdpterResumer(item);
        recyclerViewResumer.setAdapter(adapter);

        //Eventos
        presenter.getInfo(nome,cpf,email, saleValue, amountReceived,change, item);
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
        btnMenuResumer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.onMenuButtonClicked();
            }
        });
    }

    //Inserir os dados
    @Override
    public void printInfo(String name, String cpf, String email, String valueReceived, String valueSales, String change) {
        tvNameResume.setText(name);
        tvCpfResume.setText(cpf);
        tvEmailResume.setText(email);
        tvValueReceived.setText("R$"+valueReceived);
        tvValueSales.setText("R$"+valueSales);
        tvChange.setText("R$"+change);
    }

    //Fechar a pagina
    @Override
    public void previosResumer() {
        finish();
    }

    @Override
    public void showMenuDialog() {
        MenuFragment menu = new MenuFragment();
        menu.show(getSupportFragmentManager(), "menu_dialog");
    }

    @Override
    public void mostrarSucesso() {
        new AlertDialog.Builder(this)
                .setTitle("Ops! Algo deu errado")
                .setMessage("msg")
                .setPositiveButton("OK", null)
                .show();
    }

    @Override
    public void mostrarErro(String msg) {
        new AlertDialog.Builder(this)
                .setTitle("Ops! Algo deu errado")
                .setMessage(msg)
                .setPositiveButton("OK", null)
                .show();
    }
}