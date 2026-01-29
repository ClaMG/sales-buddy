package com.example.salesbuddy.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class ReprocessingModel {

    @SerializedName("id")
    private Integer id;
    @SerializedName("concluido")
    private List<Integer> concluido;

    @SerializedName("pendentes")
    private List<Integer> pendentes;
    @SerializedName("nome")
    public String nomeCliente;
    @SerializedName("cpf")
    public String cpf;
    @SerializedName("email")
    public String email;
    @SerializedName("itens")
    public List<ItemsModel> itens;
    @SerializedName("valorVenda")
    public double valorVenda;
    @SerializedName("valorRecebido")
    public double valorRecebido;

    @SerializedName("troco")
    public double troco;

    @SerializedName("reprocessado")
    public boolean status;

    public ReprocessingModel(){

    }


    public ReprocessingModel(Integer id, List<Integer> concluido, List<Integer> pendentes, String nomeCliente, String cpf, String email, List<ItemsModel> itens, double valorVenda, double valorRecebido, double troco, boolean status) {
        this.id = id;
        this.concluido = concluido;
        this.pendentes = pendentes;
        this.nomeCliente = nomeCliente;
        this.cpf = cpf;
        this.email = email;
        this.itens = itens;
        this.valorVenda = valorVenda;
        this.valorRecebido = valorRecebido;
        this.troco = troco;
        this.status = status;
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

    public List<ItemsModel> getItens() {
        return itens;
    }

    public void setItens(List<ItemsModel> itens) {
        this.itens = itens;
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public List<Integer> getConcluido() {
        return concluido;
    }

    public void setConcluido(List<Integer> concluido) {
        this.concluido = concluido;
    }

    public List<Integer> getPendentes() {
        return pendentes;
    }

    public void setPendentes(List<Integer> pendentes) {
        this.pendentes = pendentes;
    }
}
