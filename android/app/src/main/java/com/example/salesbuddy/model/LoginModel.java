package com.example.salesbuddy.model;

import com.google.gson.annotations.SerializedName;

public class LoginModel {

    @SerializedName("usuario")
    private String usuario;
    @SerializedName("senha")
    private String senha;
    private String mensagem;

    private String token;

    // Construtor para enviar o login
    public LoginModel(String usuario, String senha) {
        this.usuario = usuario;
        this.senha = senha;
    }

    public LoginModel() {
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


}
