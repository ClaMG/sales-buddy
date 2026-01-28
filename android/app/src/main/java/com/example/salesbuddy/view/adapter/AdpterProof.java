package com.example.salesbuddy.view.adapter;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;

import java.util.List;

public class AdpterProof extends RecyclerView.Adapter<AdpterProof.ViewHolderProof> {

    private List<ItemsModel> items;

    public AdpterProof(List<ItemsModel> items) {
        this.items = items;
    }

    @NonNull
    @Override
    public AdpterProof.ViewHolderProof onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Inflar o layout
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_proof, parent, false);
        return new ViewHolderProof(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AdpterProof.ViewHolderProof holder, int position) {
        ItemsModel item = items.get(position);

        int numList = position + 1;
        holder.tvNumProof.setText(String.valueOf(numList));

        // A descrição do item no comprovante com proteção contra nulos
        if (holder.tvNameItenProof != null && item != null) {
            holder.tvNameItenProof.setText(item.getDescricao());
        }
    }

    @Override
    public int getItemCount() {
        return (items != null) ? items.size() : 0;
    }

    public static class ViewHolderProof extends RecyclerView.ViewHolder {
        TextView tvNameItenProof;
        TextView tvNumProof;

        public ViewHolderProof(@NonNull View itemView) {
            super(itemView);
            tvNameItenProof = itemView.findViewById(R.id.tvNameItenProof);
            tvNumProof = itemView.findViewById(R.id.tvNumProof);
        }
    }
}