package com.example.salesbuddy.view;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.salesbuddy.R;
import com.example.salesbuddy.presenter.RegisterPresenter;
import com.example.salesbuddy.view.contract.RegisterContract;

public class RegisterActivity extends AppCompatActivity implements RegisterContract.View{

    private EditText txName,txCpf,txEmail,txSaleValue,txAmountReceived;
    private TextView tvTitleRegister;

    private Button btnResumer, btnBackRegister;

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
        //Presenter
        presenter = new RegisterPresenter(this,getApplicationContext());

        //Strings
        String name = String.valueOf(txName.getText());
        String cpf = String.valueOf(txCpf.getText());
        String email = String.valueOf(txEmail.getText());
        String saleValue = String.valueOf(txSaleValue.getText());
        String amountReceived = String.valueOf(txAmountReceived.getText());

        //Eventos
        presenter.testUpdate();

        btnResumer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.register(name, cpf, email, saleValue, amountReceived);
            }
        });
        btnBackRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.backRegister();
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
    }
}