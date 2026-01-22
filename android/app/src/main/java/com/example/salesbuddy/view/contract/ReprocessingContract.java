package com.example.salesbuddy.view.contract;

public interface ReprocessingContract {
    interface View{
        void showMenuDialog();

    }
    interface Presenter{
        void onMenuButtonClicked();

    }
}
