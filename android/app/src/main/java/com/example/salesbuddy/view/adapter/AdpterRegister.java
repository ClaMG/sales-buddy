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

    private List<SalesModel> items;

    public AdpterRegister(List<SalesModel> items) {
        this.items = items;
    }

    public static class ViewHolderRegister extends RecyclerView.ViewHolder {
        EditText txItemAdd;
        ImageButton btnSume;
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

        // 1. IMPORTANTE: Remova o listener antigo antes de mexer no texto
        // Para fazer isso de forma simples, podemos usar uma "tag" ou limpar o foco
        holder.txItemAdd.clearFocus();

        // 2. Antes de adicionar o novo listener, remova os anteriores (se possível)
        // ou use uma lógica para ignorar a atualização programática
        // Vamos usar a forma mais segura: carregar o texto e DEPOIS colocar o listener
        holder.txItemAdd.setText(item.getCpf()); // Ou o campo correto do seu model

        // 3. Criamos o listener
        TextWatcher textWatcher = new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                // Salva apenas se o usuário estiver digitando
                item.setCpf(s.toString());
            }

            @Override
            public void afterTextChanged(Editable s) {}
        };

        // 4. Limpamos listeners antigos que possam estar pendurados na View reciclada
        // (O Android não tem um "removeTextWatchers", então a dica é setar o texto ANTES)
        holder.txItemAdd.addTextChangedListener(textWatcher);

        // 5. Botão de Adicionar (Seu código está correto aqui)
        holder.btnSume.setOnClickListener(v -> {
            SalesModel novoItem = new SalesModel();
            int currentPosition = holder.getAdapterPosition();
            if (currentPosition != RecyclerView.NO_POSITION) {
                items.add(currentPosition + 1, novoItem);
                notifyItemInserted(currentPosition + 1);
            }
        });
    }

    @Override
    public int getItemCount() {
        return items.size();
    }
}