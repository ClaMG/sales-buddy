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

        private List<String> items; // Agora é uma lista simples de Strings

        public AdpterRegister(List<String> items) {
            this.items = items;
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
            // Remove o listener anterior para evitar que o Recycler View duplique dados ao rolar
            if (holder.textWatcher != null) {
                holder.txItemAdd.removeTextChangedListener(holder.textWatcher);
            }

            // Define o texto atual da lista
            holder.txItemAdd.setText(items.get(position));

            // Cria o novo vigia (TextWatcher)
            holder.textWatcher = new TextWatcher() {
                @Override
                public void onTextChanged(CharSequence s, int start, int before, int count) {
                    // Atualiza a String diretamente na lista original
                    items.set(holder.getAdapterPosition(), s.toString());
                }
                @Override public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
                @Override public void afterTextChanged(Editable s) {}
            };

            holder.txItemAdd.addTextChangedListener(holder.textWatcher);

            // Botão para adicionar novo campo vazio
            holder.btnSume.setOnClickListener(v -> {
                int currentPosition = holder.getAdapterPosition();
                if (currentPosition != RecyclerView.NO_POSITION) {
                    items.add(currentPosition + 1, ""); // Adiciona uma String vazia
                    notifyItemInserted(currentPosition + 1);
                }
            });
        }

        @Override
        public int getItemCount() {
            return items.size();
        }

        public static class ViewHolderRegister extends RecyclerView.ViewHolder {
            EditText txItemAdd;
            ImageButton btnSume;
            TextWatcher textWatcher;

            public ViewHolderRegister(@NonNull View itemView) {
                super(itemView);
                btnSume = itemView.findViewById(R.id.btnSume);
                txItemAdd = itemView.findViewById(R.id.txItemAdd);
            }
        }
}