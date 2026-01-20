package com.example.salesbuddy.view.contract;

public interface MenuContract {
    interface View{
        void previosMenu();
    }
    interface Presenter{
        void menuRegister();
        void menuReprocessing();
        void menuLogout();
    }
}
