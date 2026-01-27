package com.example.salesbuddy.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.List;

public class ItemsModel implements Serializable {

    @SerializedName("descricao")
    private String descricao;

    public ItemsModel(String s) {
        this.descricao = descricao;
    }

    // Dentro da classe ItemsModel
    @Override
    public String toString() {
        return this.descricao; // Retorna o texto real para o Log
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

}
