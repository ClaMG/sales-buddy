package com.example.salesbuddy.view.dialog;

import static android.content.Intent.getIntent;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.example.salesbuddy.R;
import com.example.salesbuddy.presenter.DialogPresenter;
import com.example.salesbuddy.view.contract.DialogContract;

public class DialogFragment extends androidx.fragment.app.DialogFragment implements DialogContract.View {


    private TextView tvDialog1, tvDialog2, tvDialog3;


    private DialogPresenter presenter;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.dialog_strings, container, false);

        //Componetes
        tvDialog1 = view.findViewById(R.id.tvDialog1);
        tvDialog2 = view.findViewById(R.id.tvDialog2);
        tvDialog3 = view.findViewById(R.id.tvDialog3);

        //Presenter
        presenter = new DialogPresenter(this, getContext());

        //Eventos
        String tela = getArguments().getString("tela");
        String email = getArguments().getString("email");
        Log.d("dialog", "tela: "+ tela + " email: " +email);
        presenter.alter(tela, email);
        return view;
    }

    @Override
    public void altText(String tv1, String tv2, String tv3) {
        tvDialog1.setText(tv1);
        tvDialog2.setText(tv2);
        tvDialog3.setText(tv3);
    }
}