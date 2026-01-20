package com.example.salesbuddy.view.contract;

public interface ResumerContract {

    interface View{
        void printInfo(String name,String cpf,String email,String valueReceived,String valueSales,String change);
        void previosResumer();
    }
    interface Presenter{
        void getInfo();
        void altResumer();
        void finish();
        void backResumer();
    }
}
