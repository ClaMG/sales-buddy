package com.example.salesbuddy.view.contract;

public interface SplashContract {

    interface View{
        //printar o número da versão
        void printVersion(String numVersion);
        void previosSplash();
    }

    interface Presenter{
        void onStart();
    }


}
