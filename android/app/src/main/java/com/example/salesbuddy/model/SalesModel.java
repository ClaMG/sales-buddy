package com.example.salesbuddy.model;

import java.util.ArrayList;

public class SalesModel {
    private  int id;
    private String name;
    private String cpf;
    private String email;
    private Integer amount;
    private double sale_value;
    private double value_received;
    private double change;
    private ArrayList itens;
    private Boolean update;

    public SalesModel() {
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.amount = amount;
        this.sale_value = sale_value;
        this.value_received = value_received;
        this.change = change;
        this.update = update;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public double getSale_value() {
        return sale_value;
    }

    public void setSale_value(double sale_value) {
        this.sale_value = sale_value;
    }

    public double getValue_received() {
        return value_received;
    }

    public void setValue_received(double value_received) {
        this.value_received = value_received;
    }

    public double getChange() {
        return change;
    }

    public void setChange(double change) {
        this.change = change;
    }
    public ArrayList getItens() {
        return itens;
    }

    public void setItens(ArrayList itens) {
        this.itens = itens;
    }

    public Boolean getUpdate() {
        return update;
    }

    public void setUpdate(Boolean update) {
        this.update = update;
    }
}
