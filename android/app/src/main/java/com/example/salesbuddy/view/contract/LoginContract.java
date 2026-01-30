package com.example.salesbuddy.view.contract;

public interface LoginContract {

    interface View{
        //Memsagem login
        void mostrarErro(String menssage);
        void previosLogin();
        void mostrarLoading(boolean exibir);

    }

    interface Presenter{
        void login(String user, String password);
    }
}
