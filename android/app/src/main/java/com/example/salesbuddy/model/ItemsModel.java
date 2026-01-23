package com.example.salesbuddy.model;

import java.io.Serializable;

public class ItemsModel implements Serializable {

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
