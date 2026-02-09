package com.example.salesbuddy.view.adapter;

import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageButton;


import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;

import java.util.ArrayList;
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

            // Limpa o listener anterior
            holder.txItemAdd.removeTextChangedListener(holder.currentWatcher);

            holder.txItemAdd.setText(item.getDescricao()); // Ajuste para o método do seu ItemsModel

            // Novo TextWatcher
            holder.currentWatcher = new TextWatcher() {
                @Override
                public void onTextChanged(CharSequence s, int start, int before, int count) {
                    // Atualiza o objeto diretamente
                    item.setDescricao(s.toString());
                }
                @Override public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
                @Override public void afterTextChanged(Editable s) {}
            };

            holder.txItemAdd.addTextChangedListener(holder.currentWatcher);

            //Adicionar
            if (position == items.size() - 1) {
                holder.btnSume.setImageResource(R.drawable.icon_sume);
                holder.btnSume.setBackgroundResource(R.drawable.btn_register_sume);

                //Atualiza btn
                holder.btnSume.setOnClickListener(v -> {
                    int pos = holder.getBindingAdapterPosition();
                    if (pos != RecyclerView.NO_POSITION) {
                        String textoAtual = items.get(pos).getDescricao();
                        if (textoAtual == null || textoAtual.trim().isEmpty()) {
                            String mensagemErro = v.getContext().getString(R.string.error_empty_item_field);
                            holder.txItemAdd.setError(mensagemErro);
                            return;
                        }
                        items.add(new ItemsModel(""));
                        notifyItemInserted(items.size() - 1);
                        notifyItemChanged(pos);
                    }
                });
            } else {
                //Remover
                holder.btnSume.setImageResource(R.drawable.icon_subtract);
                holder.btnSume.setBackgroundResource(R.drawable.btn_register_sub);

                holder.btnSume.setOnClickListener(v -> {
                    int pos = holder.getBindingAdapterPosition();
                    if (pos != RecyclerView.NO_POSITION) {
                        items.remove(pos);
                        notifyItemRemoved(pos);
                        notifyItemRangeChanged(pos, items.size()); // Recalcula as posições
                    }
                });
            }

        }

    @Override
    public int getItemCount() {
        return items != null ? items.size() : 0;
    }

    public List<ItemsModel> getItems() {
        List<ItemsModel> itensValidados = new ArrayList<>();

        for (ItemsModel item : items) {
            // .trim() remove espaços vazios. .isEmpty() checa se sobrou algo.
            if (item.getDescricao() != null && !item.getDescricao().trim().isEmpty()) {
                itensValidados.add(item);
            }
        }

        return itensValidados;
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