package com.example.salesbuddy.model;

import java.util.List;

public class SalesModel {
    public String nomeCliente;
    public String cpf;
    public String email;
    public List<ItemsModel> itens;
    public double valorRecebido;
    public double valorVenda;
    public double troco;

    public SalesModel() {

    }
    public SalesModel(String nomeCliente, String cpf, String email, double valorVenda, double valorRecebido, double troco, List<ItemsModel> itens) {
        this.nomeCliente = nomeCliente;
        this.cpf = cpf;
        this.email = email;
        this.valorVenda = valorVenda;
        this.valorRecebido = valorRecebido;
        this.troco = troco;
        this.itens = itens;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
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

    public double getValorVenda() {
        return valorVenda;
    }

    public void setValorVenda(double valorVenda) {
        this.valorVenda = valorVenda;
    }

    public double getValorRecebido() {
        return valorRecebido;
    }

    public void setValorRecebido(double valorRecebido) {
        this.valorRecebido = valorRecebido;
    }

    public double getTroco() {
        return troco;
    }

    public void setTroco(double troco) {
        this.troco = troco;
    }

    public List<ItemsModel> getItens() {
        return itens;
    }

    public void setItens(List<ItemsModel> itens) {
        this.itens = itens;
    }
}
