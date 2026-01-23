package com.example.salesbuddy.view.dialog;

import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;

import androidx.annotation.GravityInt;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;

import com.example.salesbuddy.R;
import com.example.salesbuddy.presenter.MenuPresenter;
import com.example.salesbuddy.view.contract.MenuContract;

public class MenuFragment extends DialogFragment implements MenuContract.View {

    private Button btnMenuLogout, btnMenuRegister, btnMenuReprocessing;
    private ImageButton btnMenuBack;
    private MenuPresenter presenter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.activity_menu, container, false);

        if (getDialog() != null && getDialog().getWindow() != null) {
            getDialog().getWindow().setBackgroundDrawableResource(android.R.color.transparent);
            getDialog().getWindow().setGravity(Gravity.TOP);
        }


        //Componentes
        btnMenuLogout = view.findViewById(R.id.btnMenuLogout);
        btnMenuRegister = view.findViewById(R.id.btnMenuRegister);
        btnMenuReprocessing = view.findViewById(R.id.btnMenuReprocessing);
        btnMenuBack = view.findViewById(R.id.btnMenuBack);

        presenter = new MenuPresenter(this, getContext());

        // Eventos
        btnMenuBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dismiss();
            }
        });
        btnMenuRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.menuRegister();
                dismiss();
            }
        });

        btnMenuLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.menuLogout();
                dismiss();
            }
        });

        btnMenuReprocessing.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                presenter.menuReprocessing();
                dismiss();
            }
        });


        return view;
    }

    @Override
    public void previosMenu() {
        dismiss();
    }
}