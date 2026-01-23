package com.example.salesbuddy.model;

public class LoginModel {

    private String usuario;
    private String senha;
    private String mensagem;

    private String token;
    private String nomeUsuario;

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

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }
}
