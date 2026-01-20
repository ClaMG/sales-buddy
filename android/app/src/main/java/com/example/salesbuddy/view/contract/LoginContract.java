package com.example.salesbuddy.view.contract;

public interface LoginContract {

    interface View{
        //Memsagem login
        void showToastLogin(String menssage);
        void previosLogin();
    }

    interface Presenter{
        void login(String user, String password);
    }
}
