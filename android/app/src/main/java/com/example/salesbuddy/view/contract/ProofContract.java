package com.example.salesbuddy.view.contract;

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
        void getInfo(String name, String cpf, String email, String valueReceived, String valueSales, String change);
        void no();
        void yes();
        void backProof();
        void onMenuButtonClicked();

    }
}
