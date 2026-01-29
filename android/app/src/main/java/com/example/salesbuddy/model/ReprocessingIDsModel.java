package com.example.salesbuddy.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class ReprocessingIDsModel {
    @SerializedName("id")
    public List<Integer> ids;

    public List<Object> concluido;

    public  ReprocessingIDsModel(){}


    public ReprocessingIDsModel(List<Integer> ids, List<Object> concluido) {
        this.ids = ids;
        this.concluido = concluido;
    }

    public List<Integer> getIds() {
        return ids;
    }

    public void setIds(List<Integer> ids) {
        this.ids = ids;
    }

    public List<Object> getConcluido() {
        return concluido;
    }

    public void setConcluido(List<Object> concluido) {
        this.concluido = concluido;
    }
}
