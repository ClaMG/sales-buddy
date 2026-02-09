package com.example.salesbuddy.presenter;

import android.content.Context;

import com.example.salesbuddy.R;
import com.example.salesbuddy.view.contract.DialogContract;

public class DialogPresenter implements DialogContract.Presente {
    private final DialogContract.View view;
    private final Context context;
    public DialogPresenter(DialogContract.View view, Context context) {
        this.view = view;
        this.context = context;

    }


    @Override
    public void alter(String tela, String email) {
        String tv1 = "", tv2 = "", tv3 = null;
        boolean negrito = false;

        if ("email".equals(tela)){
            tv1 = context.getString(R.string.dialog_email_tv1);
            tv2 = context.getString(R.string.dialog_email_tv2);
            tv3 = email;
            negrito = true;
        }
        if ("Resumer".equals(tela)){
            tv1 = context.getString(R.string.dialog_resume_tv1);
            tv2 = context.getString(R.string.dialog_resume_tv2);
        }
        if ("reprocessingSucess".equals(tela)){
            tv1 = context.getString(R.string.dialog_repro_success_tv1);
            tv2 = context.getString(R.string.dialog_repro_success_tv2);
        } if ("reprocessingError".equals(tela)){
            tv1 = context.getString(R.string.dialog_repro_error_tv1);
            tv2 = context.getString(R.string.dialog_repro_error_tv2);
            tv3 = context.getString(R.string.dialog_repro_error_tv3);
        }
        if ("ReprocessamentoResumer".equals(tela)){
            tv1 = context.getString(R.string.dialog_repro_error_tv1);
            tv2 = context.getString(R.string.dialog_repro_resume_error_tv2);
            tv3 = context.getString(R.string.dialog_repro_resume_error_tv3);
        }
        view.altText(tv1,tv2,tv3, negrito);
    }
}
