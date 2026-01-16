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

public class ResumerActivity extends AppCompatActivity {

    private TextView tvNameResume,tvCpfResume,tvEmailResume,tvValueReceived,tvValueSales,tvChange;

    private Button btnResumerAlter, btnEnd;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_resumer);

        tvNameResume = findViewById(R.id.tvNameResume);
        tvCpfResume = findViewById(R.id.tvCpfResume);
        tvEmailResume = findViewById(R.id.tvEmailResume);
        tvValueReceived = findViewById(R.id.tvValueReceived);
        tvValueSales = findViewById(R.id.tvValueSales);
        tvChange = findViewById(R.id.tvCpfResume);
        btnResumerAlter = findViewById(R.id.btnResumerAlter);
        btnEnd = findViewById(R.id.btnEnd);
    }
}