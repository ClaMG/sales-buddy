package com.example.salesbuddy.view;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ReprocessingModel;
import com.example.salesbuddy.presenter.ReprocessingPresenter;
import com.example.salesbuddy.view.adapter.AdapterReprocessing;
import com.example.salesbuddy.view.contract.ReprocessingContract;
import com.example.salesbuddy.view.dialog.MenuFragment;

import java.util.ArrayList;
import java.util.List;

public class ReprocessingActivity extends AppCompatActivity implements ReprocessingContract.View {

    private ImageButton btnMenuViewReprocessing, btnBackReprocessing;
    private Button btnReprocessing;

    private RecyclerView RecyclerViewReprocessing;
    private AdapterReprocessing adapter;
    private List<ReprocessingModel> listaLocal = new ArrayList<>(); // Lista que será usada pelo botão

    private ReprocessingPresenter presenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_reprocessing);

        //Componentes
        btnMenuViewReprocessing = findViewById(R.id.btnMenuViewReprocessing);
        btnBackReprocessing = findViewById(R.id.btnBackReprocessing);
        btnReprocessing = findViewById(R.id.btnReprocessing);
        RecyclerViewReprocessing = findViewById(R.id.RecyclerViewReprocessing);

        //Presenter
        presenter = new ReprocessingPresenter(this, getApplicationContext());

        presenter.getInfo();
        RecyclerViewReprocessing.setLayoutManager(new LinearLayoutManager(this));

        adapter = new AdapterReprocessing(listaLocal);
        RecyclerViewReprocessing.setAdapter(adapter);


        btnMenuViewReprocessing.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.onMenuButtonClicked();
            }
        });
        btnBackReprocessing.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.backReprocessing();
            }
        });
        btnReprocessing.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.reprocessing(listaLocal);
            }
        });
    }

    @Override
    public void showMenuDialog() {
        MenuFragment menu = new MenuFragment();
        menu.show(getSupportFragmentManager(), "menu_dialog");
    }

    @Override
    public void previosReprocessing() {
        finish();
    }

    @Override
    public void mostrarErro(String msg) {
        new AlertDialog.Builder(this)
                .setTitle("Ops! Algo deu errado")
                .setMessage(msg)
                .setPositiveButton("OK", null)
                .show();
    }

    @Override
    public void success() {
        new AlertDialog.Builder(this)
                .setTitle("Ops! Algo deu errado")
                .setMessage("msg")
                .setPositiveButton("OK", null)
                .show();
    }

    @Override
    public void info(List<ReprocessingModel> info) {
        Log.d("TAG", "info: "+info);
        this.listaLocal.clear();
        this.listaLocal.addAll(info);

        adapter.notifyDataSetChanged();
    }
}