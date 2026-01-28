package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.salesbuddy.view.HomeActivity;
import com.example.salesbuddy.view.contract.ReprocessingContract;

public class ReprocessingPresenter implements ReprocessingContract.Presenter {
    private final ReprocessingContract.View view;

    private Context context;

    public ReprocessingPresenter(ReprocessingContract.View view, Context context) {
        this.view = view;
        this.context = context;
    }

    @Override
    public void onMenuButtonClicked() {
        view.showMenuDialog();
    }

    @Override
    public void reprocessing() {
        //logica para reprocessar
    }

    @Override
    public void backReprocessing() {
        Intent intent = new Intent(context, HomeActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosReprocessing();
    }
}
