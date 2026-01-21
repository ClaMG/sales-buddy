package com.example.salesbuddy.view.contract;

import android.view.View;

import java.util.List;

public interface ProofContract {

    interface View{
        void printInfo(String name,String cpf,String email,String valueReceived,String valueSales,String change, String idNum);
        void previosProof();
    }
    interface Presenter{
        void getInfo();
        void no();
        void yes(android.view.View LayoutProof);

        void backProof();
    }
}
