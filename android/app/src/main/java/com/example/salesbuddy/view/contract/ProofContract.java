package com.example.salesbuddy.view.contract;

import com.example.salesbuddy.model.ItemsModel;

import java.util.List;

public interface ProofContract {

    interface View{
        void printInfo(String name,String cpf,String email,String valueReceived,String valueSales,String change, String idNum);
        void previosProof();
        void showMenuDialog();
        void mostrarSucesso();
        void mostrarErro(String mensagem);
        void mostrarSucessoEmail();

    }
    interface Presenter{
        void getInfo(String name, String cpf, String email,
                     String valueReceived, String valueSales, String change, List<ItemsModel> itens);
        void no();
        void yes();
        void backProof();
        void onMenuButtonClicked();

    }
}
