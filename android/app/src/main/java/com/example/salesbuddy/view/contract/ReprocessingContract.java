package com.example.salesbuddy.view.contract;

public interface ReprocessingContract {
    interface View{
        void showMenuDialog();
        void previosReprocessing();

    }
    interface Presenter{
        void onMenuButtonClicked();

        void reprocessing();
        void backReprocessing();

    }
}
