package com.example.salesbuddy.view;

import static android.content.Intent.getIntent;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.presenter.RegisterPresenter;
import com.example.salesbuddy.view.adapter.AdpterRegister;
import com.example.salesbuddy.view.contract.RegisterContract;
import com.example.salesbuddy.view.dialog.MenuActivity;

import java.util.ArrayList;
import java.util.List;

public class RegisterActivity extends AppCompatActivity implements RegisterContract.View{

    private EditText txName,txCpf,txEmail,txSaleValue,txAmountReceived;
    private TextView tvTitleRegister;
    private RecyclerView recyclerViewRegister;

    private View btnResumer;
    private ImageButton btnBackRegister, btnMenuCreate;

    private RegisterPresenter presenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_register);

        //Componentes
        tvTitleRegister = findViewById(R.id.tvTitleRegister);
        txName = findViewById(R.id.txName);
        txCpf = findViewById(R.id.txCpf);
        txEmail = findViewById(R.id.txEmail);
        txSaleValue = findViewById(R.id.txSaleValue);
        txAmountReceived = findViewById(R.id.txAmountReceived);
        btnResumer = findViewById(R.id.btnResumer);
        btnBackRegister = findViewById(R.id.btnBackRegister);
        recyclerViewRegister = findViewById(R.id.recyclerViewRegister);
        btnMenuCreate = findViewById(R.id.btnMenuCreate);
        //Presenter
        presenter = new RegisterPresenter(this,getApplicationContext());

        //Eventos
        boolean isUpdate = getIntent().getBooleanExtra("IS_UPDATE", false);
        presenter.testUpdate(isUpdate);

        btnResumer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String name = txName.getText().toString().trim();
                String cpf = txCpf.getText().toString().trim();
                String email = txEmail.getText().toString().trim();
                String saleValue = txSaleValue.getText().toString().trim();
                String amountReceived = txAmountReceived.getText().toString().trim();
                presenter.register(name, cpf, email, saleValue, amountReceived);
            }
        });
        btnBackRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.backRegister();
            }
        });
        btnMenuCreate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.onMenuButtonClicked();
            }
        });
    }

    //Fecha pagina
    @Override
    public void previosRegister() {
        finish();
    }

    //Aparecer a mensagem no toast
    @Override
    public void showToastRegister(String menssage) {
        Toast.makeText(this, menssage, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void update(String nome, String cpf, String email, String valor_venda, String valor_recebido, String title) {
        txName.setText(nome);
        txCpf.setText(cpf);
        txEmail.setText(email);
        txAmountReceived.setText(valor_recebido);
        txSaleValue.setText(valor_venda);
        tvTitleRegister.setText(title);

        List<SalesModel> itens = new ArrayList<>();
        itens.add(new SalesModel()); // Adiciona o primeiro campo
        AdpterRegister adpter = new AdpterRegister(itens);
        recyclerViewRegister.setAdapter(adpter);
    }
    @Override
    public void showMenuDialog() {
        Intent intent = new Intent(this, MenuActivity.class);
        startActivity(intent);
    }
}