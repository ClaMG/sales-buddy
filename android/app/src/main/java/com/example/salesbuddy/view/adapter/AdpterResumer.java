package com.example.salesbuddy.view.adapter;


import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.salesbuddy.R;
import com.example.salesbuddy.model.ItemsModel;

import java.util.List;

public class AdpterResumer extends RecyclerView.Adapter<AdpterResumer.ViewHolderResumer> {

    private List<ItemsModel> items;

    public AdpterResumer(List<ItemsModel> items) {
        this.items = items;
    }

    @NonNull
    @Override
    public AdpterResumer.ViewHolderResumer onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        //Para inflar o layout
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_resumer, parent, false);
        return new ViewHolderResumer(view);

    }

    @Override
    public void onBindViewHolder(@NonNull AdpterResumer.ViewHolderResumer holder, int position) {
        ItemsModel item = items.get(position);

        int numList = position + 1;
            holder.tvNum.setText(String.valueOf(numList));

        // A descrição do item
        if (holder.tvNameIten != null && item != null) {
            // Use o método que retorna o texto (getDescricao)
            holder.tvNameIten.setText(item.getDescricao());
        }

    }

    @Override
    public int getItemCount() {
        return (items != null) ? items.size() : 0;
    }

    public static class ViewHolderResumer extends RecyclerView.ViewHolder {
        TextView tvNameIten;
        TextView tvNum;

        public ViewHolderResumer(@NonNull View itemView) {
            super(itemView);
            tvNameIten = itemView.findViewById(R.id.tvNameIten);
            tvNum = itemView.findViewById(R.id.tvNum);
        }
    }
}