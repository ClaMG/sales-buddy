package com.example.salesbuddy.view.contract;

public interface LoginContract {

    interface View{
        //Memsagem login
        void mostrarErro(String menssage);
        void previosLogin();

    }

    interface Presenter{
        void login(String user, String password);
    }
}
