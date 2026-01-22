package com.example.salesbuddy.view.contract;

import java.util.ArrayList;
import java.util.List;

public interface ResumerContract {

    interface View{
        void printInfo(String name, String cpf, String email, String valueReceived, String valueSales, String change);
        void previosResumer();
        void showMenuDialog();
    }
    interface Presenter{
        void getInfo();
        void altResumer();
        void finish();
        void backResumer();
        void onMenuButtonClicked();

    }
}
