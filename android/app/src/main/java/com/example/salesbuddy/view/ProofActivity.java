package com.example.salesbuddy.view;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.presenter.ProofPresenter;
import com.example.salesbuddy.view.adapter.AdpterProof;
import com.example.salesbuddy.view.contract.ProofContract;
import com.example.salesbuddy.view.dialog.DialogFragment;
import com.example.salesbuddy.view.dialog.MenuFragment;

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
        List<ItemsModel> item = (List<ItemsModel>) getIntent().getSerializableExtra("itens");

        Log.d("DEBUG_SALE", "--- Dados da Venda ---");
        Log.d("DEBUG_SALE", "Nome: " + nome);
        Log.d("DEBUG_SALE", "CPF: " + cpf);
        Log.d("DEBUG_SALE", "Email: " + email);
        Log.d("DEBUG_SALE", "Valor Venda: " + saleValue);
        Log.d("DEBUG_SALE", "Valor Recebido: " + amountReceived);

// Log da Lista de Itens
        if (item != null) {
            Log.d("DEBUG_SALE", "Quantidade de itens: " + item.size());
            for (int i = 0; i < item.size(); i++) {
                // Supondo que ItemsModel tenha um método getDescricao()
                Log.d("DEBUG_SALE", "Item " + i + ": " + item.get(i).getDescricao());
            }
        } else {
            Log.e("DEBUG_SALE", "A lista de itens veio NULA!");
        }
        Log.d("DEBUG_SALE", "-----------------------");

        Log.d("TAG", "onCreateProof: "+ email);

        //Eventos
        presenter.getInfo(nome,cpf,email, saleValue, amountReceived,change, item);
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
    public void printInfo(String name, String cpf, String email, String valueReceived, String valueSales, String change, String idNum, List<ItemsModel> itens) {
        tvNameProof.setText(name);
        tvCpfProof.setText(cpf);
        tvEmailProof.setText(email);
        tvValueReceivedProof.setText("R$"+valueReceived);
        tvValueSalesProof.setText("R$"+valueSales);
        tvChangeProof.setText("R$"+change);
        tvSaleId.setText("Venda nº" + idNum);

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

    @Override
    public void mostrarSucesso() {
        DialogFragment dialog = new DialogFragment();
        dialog.show(getSupportFragmentManager(), "dialog_string");
    }


    @Override
    public void mostrarErro(String mensagem) {
        new AlertDialog.Builder(this)
                .setTitle("Ops! Algo deu errado")
                .setMessage(mensagem)
                .setPositiveButton("OK", null)
                .show();
    }

}