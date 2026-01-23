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
        if (this.items.isEmpty()) {
            this.items.add(new ItemsModel(""));
        }
    }


    @NonNull
        @Override
        public ViewHolderRegister onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.item_register, parent, false);
            return new ViewHolderRegister(view);
        }

        @Override
        public void onBindViewHolder(@NonNull ViewHolderRegister holder, int position) {
            ItemsModel item = items.get(position);

            // Limpa o listener anterior para não dar conflito ao reciclar a view
            holder.txItemAdd.removeTextChangedListener(holder.currentWatcher);

            holder.txItemAdd.setText(item.getDescricao()); // Ajuste para o método do seu ItemsModel

            // Novo TextWatcher
            holder.currentWatcher = new TextWatcher() {
                @Override
                public void onTextChanged(CharSequence s, int start, int before, int count) {
                    // Atualiza o objeto diretamente (mais seguro que usar o índice da lista)
                    item.setDescricao(s.toString());
                }
                @Override public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
                @Override public void afterTextChanged(Editable s) {}
            };

            holder.txItemAdd.addTextChangedListener(holder.currentWatcher);

            // Botão Adicionar
            holder.btnSume.setOnClickListener(v -> {
                int pos = holder.getBindingAdapterPosition();
                if (pos != RecyclerView.NO_POSITION) {
                    items.add(pos + 1, new ItemsModel(""));
                    notifyItemInserted(pos + 1);
                }
            });
        }

    @Override
    public int getItemCount() {
        return items.size();
    }

    public List<ItemsModel> getItems() {
        return items;
    }

    public static class ViewHolderRegister extends RecyclerView.ViewHolder {
        EditText txItemAdd;
        ImageButton btnSume;
        TextWatcher currentWatcher; // Guardamos aqui para poder remover no onBind

        public ViewHolderRegister(@NonNull View itemView) {
            super(itemView);
            btnSume = itemView.findViewById(R.id.btnSume);
            txItemAdd = itemView.findViewById(R.id.txItemAdd);
        }
    }
}