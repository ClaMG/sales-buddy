package com.example.salesbuddy.view.adapter;


import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ReprocessingModel;

import java.util.List;
import java.util.Locale;

public class AdapterReprocessing extends RecyclerView.Adapter<AdapterReprocessing.ViewHolderReprocesssing> {

    private List<ReprocessingModel> reprocessings;

    public AdapterReprocessing(List<ReprocessingModel> lista) {
        this.reprocessings = lista;
    }

    @NonNull
    @Override
    public AdapterReprocessing.ViewHolderReprocesssing onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_reprocessing, parent, false);
        return new AdapterReprocessing.ViewHolderReprocesssing(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AdapterReprocessing.ViewHolderReprocesssing holder, int position) {
        ReprocessingModel reprocessing = reprocessings.get(position);


        holder.tvNameReprocessing.setText(reprocessing.nomeCliente != null ? reprocessing.nomeCliente : "Cliente não identificado");


        String valorFormatado = String.format(Locale.getDefault(), "R$ %.2f", reprocessing.valorVenda);
        holder.tvValueReprocessing.setText(valorFormatado);

        // Lógica de mudança de cor
        if (reprocessing.isStatus()) {
            holder.viewReprocessing.setBackgroundResource(R.drawable.view_reprocessing_true);
        } else {
            holder.viewReprocessing.setBackgroundResource(R.drawable.view_reprocessing);
        }
    }

    @Override
    public int getItemCount() {
        return (reprocessings != null) ? reprocessings.size() : 0;
    }

    public void atualizarLista(List<ReprocessingModel> novaLista) {
        this.reprocessings = novaLista;
        notifyDataSetChanged();
    }


    public static class ViewHolderReprocesssing extends RecyclerView.ViewHolder {
        TextView tvNameReprocessing;
        TextView tvValueReprocessing;

        View viewReprocessing;


        public ViewHolderReprocesssing(@NonNull View itemView) {
            super(itemView);
            tvNameReprocessing = itemView.findViewById(R.id.tvNameReprocessing);
            tvValueReprocessing = itemView.findViewById(R.id.tvValueReprocessing);
            viewReprocessing = itemView.findViewById(R.id.viewReprocessing);

        }
    }
}