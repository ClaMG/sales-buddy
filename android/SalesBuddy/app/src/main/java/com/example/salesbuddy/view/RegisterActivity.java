package com.example.salesbuddy.view;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.salesbuddy.R;

public class RegisterActivity extends AppCompatActivity {

    private EditText txName, txCpf, txEmail, txSaleValue, txAmountReceived;

    private Button btnResumer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_register);


        txName = findViewById(R.id.txName);
        txCpf = findViewById(R.id.txCpf);
        txEmail = findViewById(R.id.txEmail);
        txSaleValue = findViewById(R.id.txSaleValue);
        txAmountReceived = findViewById(R.id.txAmountReceived);
    }
}