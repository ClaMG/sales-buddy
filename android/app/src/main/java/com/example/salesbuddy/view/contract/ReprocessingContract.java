package com.example.salesbuddy.view.contract;

import com.example.salesbuddy.model.ReprocessingModel;

import java.util.List;

public interface ReprocessingContract {
    interface View{
        void showMenuDialog();
        void previosReprocessing();

        void mostrarErro(String msg);
        void success();

        void info(List<ReprocessingModel> info);

    }
    interface Presenter{
        void onMenuButtonClicked();

        void getInfo();

        void reprocessing(List<ReprocessingModel> listaLocal);
        void backReprocessing();

    }
}
