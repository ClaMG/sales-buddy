package com.example.salesbuddy.view;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ProgressBar;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ReprocessingModel;
import com.example.salesbuddy.presenter.ReprocessingPresenter;
import com.example.salesbuddy.view.adapter.AdapterReprocessing;
import com.example.salesbuddy.view.contract.ReprocessingContract;
import com.example.salesbuddy.view.dialog.DialogFragment;
import com.example.salesbuddy.view.dialog.MenuFragment;

import java.util.ArrayList;
import java.util.List;

public class ReprocessingActivity extends AppCompatActivity implements ReprocessingContract.View {

    private ImageButton btnMenuViewReprocessing, btnBackReprocessing;
    private Button btnReprocessing;

    private RecyclerView RecyclerViewReprocessing;
    private AdapterReprocessing adapter;
    private List<ReprocessingModel> listaLocal = new ArrayList<>();
    private ProgressBar progressBarReprocessing;
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
        progressBarReprocessing = findViewById(R.id.progressBarReprocessing);

        //Presenter
        presenter = new ReprocessingPresenter(this, getApplicationContext());

        presenter.getInfo();
        RecyclerViewReprocessing.setLayoutManager(new LinearLayoutManager(this));

        adapter = new AdapterReprocessing(listaLocal);
        RecyclerViewReprocessing.setAdapter(adapter);


        btnMenuViewReprocessing.setOnClickListener(v -> { presenter.onMenuButtonClicked();});

        btnBackReprocessing.setOnClickListener(v -> { presenter.backReprocessing();});

        btnReprocessing.setOnClickListener(v -> {presenter.reprocessing(listaLocal);});
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
                .setTitle(this.getString(R.string.dialog_title_error))
                .setMessage(msg)
                .setPositiveButton("OK", null)
                .show();
    }

    @Override
    public void success(String tela) {

        DialogFragment dialog = new DialogFragment();
        Bundle args = new Bundle();
        args.putString("tela", tela);

        dialog.setArguments(args);
        dialog.show(getSupportFragmentManager(), "dialog_string");
        new android.os.Handler().postDelayed(dialog::dismiss, 3000);
    }

    @Override
    public void info(List<ReprocessingModel> info) {
        Log.d("TAG", "info: "+info);
        this.listaLocal.clear();
        this.listaLocal.addAll(info);

        RecyclerViewReprocessing.post(() -> {
            adapter.notifyDataSetChanged();
        });
    }

    @Override
    public void setReprocessButtonEnabled(boolean enabled) {
        btnReprocessing.setEnabled(enabled);

        if (enabled) {
            btnReprocessing.setBackgroundTintList(ContextCompat.getColorStateList(this, R.color.blue));
            btnReprocessing.setAlpha(1.0f);
        } else {
            btnReprocessing.setBackgroundTintList(ContextCompat.getColorStateList(this, R.color.gray));
            btnReprocessing.setAlpha(0.6f);
        }

    }

    @Override
    public void mostrarLoading(boolean exibir) {
        if (exibir) {
            progressBarReprocessing.setVisibility(View.VISIBLE);
        } else {
            progressBarReprocessing.setVisibility(View.GONE);
        }
    }
}