package com.example.salesbuddy.view;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.presenter.RegisterPresenter;
import com.example.salesbuddy.view.adapter.AdpterRegister;
import com.example.salesbuddy.view.contract.RegisterContract;
import com.example.salesbuddy.view.dialog.MenuFragment;

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
        recyclerViewRegister.setLayoutManager(new LinearLayoutManager(this));

        //Eventos
        boolean isUpdate = Boolean.parseBoolean(getIntent().getStringExtra("IS_UPDATE"));
        String name = getIntent().getStringExtra("nome");
        String cpf = getIntent().getStringExtra("cpf");
        String email = getIntent().getStringExtra("email");
        String saleValue = getIntent().getStringExtra("valor_venda");
        String amountReceived = getIntent().getStringExtra("valor_recebido");
        List<ItemsModel> item = (List<ItemsModel>) getIntent().getSerializableExtra("itens");
        if (item == null) item = new ArrayList<>();



        AdpterRegister adapter;
        if (isUpdate) {
            adapter = new AdpterRegister(item);
        } else {

            adapter = new AdpterRegister(new ArrayList<>());
        }


        recyclerViewRegister.setAdapter(adapter);

        presenter.updateconfirm(isUpdate, name, cpf, email, saleValue, amountReceived, item);


        btnResumer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String name = txName.getText().toString().trim();
                String cpf = txCpf.getText().toString().trim();
                String email = txEmail.getText().toString().trim();
                String saleValue = txSaleValue.getText().toString().trim();
                String amountReceived = txAmountReceived.getText().toString().trim();
                List<ItemsModel> itens = adapter.getItems();
                presenter.register(name, cpf, email, saleValue, amountReceived, itens);
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
        if (menssage != null){
            Toast.makeText(this, menssage, Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void showMenuDialog() {
        MenuFragment menu = new MenuFragment();
        menu.show(getSupportFragmentManager(), "menu_dialog");
    }

    @Override
    public void update(String nome, String cpf, String email, String valor_venda, String valor_recebido, String title, List<ItemsModel> itens) {
        txName.setText(nome);
        txCpf.setText(cpf);
        txEmail.setText(email);
        txAmountReceived.setText(valor_recebido);
        txSaleValue.setText(valor_venda);
        tvTitleRegister.setText(title);

        AdpterRegister adapter = new AdpterRegister(itens);
        recyclerViewRegister.setAdapter(adapter);
    }
}