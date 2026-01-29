package com.example.salesbuddy.view.contract;

import com.example.salesbuddy.model.ItemsModel;

import java.util.ArrayList;
import java.util.List;

public interface ResumerContract {

    interface View{
        void printInfo(String name, String cpf, String email, String valueReceived, String valueSales, String change);
        void previosResumer();
        void showMenuDialog();
        void mostrarSucesso(String tela);
        void mostrarErro(String msg);
    }
    interface Presenter{
        void getInfo(String name, String cpf, String email, String valueReceived, String valueSales,
                     String change,List<ItemsModel> itens);
        void altResumer();
        void finish();
        void backResumer();
        void onMenuButtonClicked();

    }
}
