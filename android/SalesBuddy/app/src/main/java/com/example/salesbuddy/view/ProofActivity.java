package com.example.salesbuddy.view;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.salesbuddy.R;

public class ProofActivity extends AppCompatActivity {

    private TextView tvNameProof,tvCpfProof,tvEmailProof,tvValueReceivedProof,tvValueSalesProof ,tvChangeProof , tvSaleId;
    private Button btnNo, btnYes;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_proof);

        tvNameProof = findViewById(R.id.tvNameProof);
        tvCpfProof = findViewById(R.id.tvCpfProof);
        tvEmailProof = findViewById(R.id.tvEmailProof);
        tvValueReceivedProof = findViewById(R.id.tvValueReceivedProof);
        tvValueSalesProof = findViewById(R.id.tvValueSalesProof);
        tvChangeProof = findViewById(R.id.tvChangeProof);
        tvSaleId = findViewById(R.id.tvSaleId);
        btnNo = findViewById(R.id.btnNo);
        btnYes = findViewById(R.id.btnYes);
    }
}