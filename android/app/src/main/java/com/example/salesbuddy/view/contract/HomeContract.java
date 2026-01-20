package com.example.salesbuddy.view.contract;

public interface HomeContract {

    interface View{
        //Finalizar pagina
        void previosHome();
    }

    interface Presenter{
        //Encaminhar para outra pagina
        void goSales();
        void goReprocess();
    }

}
