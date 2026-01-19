package com.example.salesbuddy.view.contract;

public interface LoginContract {

    interface View{
        //Memsagem login
        void showToast(String message);
    }

    interface Presenter{
        void logintest(String user, String password);
    }
}
