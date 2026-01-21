package com.example.salesbuddy.view.adapter;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;
import com.example.salesbuddy.model.SalesModel;

import java.util.List;

public class AdpterRegister extends RecyclerView.Adapter<AdpterRegister.ViewHolderRegister> {

    private List<SalesModel> items;

    public AdpterRegister(List<SalesModel> items) {
        this.items = items;
    }

    public static class ViewHolderRegister extends RecyclerView.ViewHolder {
        EditText txItemAdd;
        Button btnSume;
        public ViewHolderRegister(@NonNull View itemView){
            super(itemView);

            btnSume = itemView.findViewById(R.id.btnSume);
            txItemAdd = itemView.findViewById(R.id.txItemAdd);
        }

    }


    @NonNull
    @Override
    public AdpterRegister.ViewHolderRegister onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_register, parent, false);
        return new AdpterRegister.ViewHolderRegister(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AdpterRegister.ViewHolderRegister holder, int position) {
        SalesModel item = items.get(position);

        // Quando clicar no botão "+" deste item
        holder.btnSume.setOnClickListener(v -> {
            //Cria um novo objeto vazio
            SalesModel novoItem = new SalesModel();

            //Adiciona na lista
            int currentPosition = holder.getAdapterPosition();
            items.add(currentPosition + 1, novoItem);

            //Avisa o Adapter
            notifyItemInserted(currentPosition + 1);
        });

    }

    @Override
    public int getItemCount() {
        return items.size();
    }
}