package com.example.salesbuddy.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class ReprocessingModel {

    @SerializedName("id")
    public Integer id;
    @SerializedName("nomeCliente")
    public String nomeCliente;
    @SerializedName("cpf")
    public String cpf;
    @SerializedName("email")
    public String email;
    @SerializedName("valorVenda")
    public double valorVenda;
    @SerializedName("valorRecebido")
    public double valorRecebido;

    @SerializedName("troco")
    public double troco;


    @SerializedName("itens")
    public List<ItemsModel> itens;

    @SerializedName("reprocessado")
    public boolean status;

    public List<Object> concluidos;

    public ReprocessingModel(){

    }

    public ReprocessingModel(Integer id, String nomeCliente, double valorVenda, boolean status) {
        this.id = id;
        this.nomeCliente = nomeCliente;
        this.valorVenda = valorVenda;
        this.status = status;
    }

    public ReprocessingModel(String nomeCliente, String cpf, String email, double valorVenda, double valorRecebido, double troco, List<ItemsModel> itens) {
        this.nomeCliente = nomeCliente;
        this.cpf = cpf;
        this.email = email;
        this.valorVenda = valorVenda;
        this.valorRecebido = valorRecebido;
        this.troco = troco;
        this.itens = itens;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public double getValorVenda() {
        return valorVenda;
    }

    public void setValorVenda(double valorVenda) {
        this.valorVenda = valorVenda;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
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

    public List<Object> getConcluidos() {
        return concluidos;
    }

    public void setConcluidos(List<Object> concluidos) {
        this.concluidos = concluidos;
    }
}
