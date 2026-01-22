package com.example.salesbuddy.view.adapter;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;

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

    private List<ItemsModel> items;

    public AdpterRegister(List<ItemsModel> items) {
        this.items = items;
    }


    @NonNull
    @Override
    public AdpterRegister.ViewHolderRegister onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_register, parent, false);
        return new AdpterRegister.ViewHolderRegister(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolderRegister holder, int position) {
        ItemsModel item = items.get(position);

        // 1. Limpa o listener anterior antes de setar o texto para não disparar o evento sem querer
        if (holder.textWatcher != null) {
            holder.txItemAdd.removeTextChangedListener(holder.textWatcher);
        }

        // 2. Seta o texto que está no model
        holder.txItemAdd.setText(item.getDescricao());

        // 3. Cria e guarda o listener no ViewHolder para podermos remover depois
        holder.textWatcher = new TextWatcher() {
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                item.setDescricao(s.toString());
            }
            @Override public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override public void afterTextChanged(Editable s) {}
        };

        holder.txItemAdd.addTextChangedListener(holder.textWatcher);

        holder.btnSume.setOnClickListener(v -> {
            ItemsModel novoItem = new ItemsModel();
            int currentPosition = holder.getAdapterPosition();
            if (currentPosition != RecyclerView.NO_POSITION) {
                items.add(currentPosition + 1, novoItem);
                notifyItemInserted(currentPosition + 1);
            }
        });
    }

    // 4. Atualize seu ViewHolder para guardar o listener
    public static class ViewHolderRegister extends RecyclerView.ViewHolder {
        EditText txItemAdd;
        ImageButton btnSume;
        TextWatcher textWatcher; // Adicione isso aqui

        public ViewHolderRegister(@NonNull View itemView){
            super(itemView);
            btnSume = itemView.findViewById(R.id.btnSume);
            txItemAdd = itemView.findViewById(R.id.txItemAdd);
        }
    }

    @Override
    public int getItemCount() {
        return items.size();
    }
}