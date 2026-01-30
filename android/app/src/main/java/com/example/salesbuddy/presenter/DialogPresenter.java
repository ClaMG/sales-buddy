package com.example.salesbuddy.presenter;

import android.content.Context;

import com.example.salesbuddy.view.contract.DialogContract;

public class DialogPresenter implements DialogContract.Presente {
    private final DialogContract.View view;
    private Context context;

    private String tv1;
    private String tv2;
    private String tv3;

    private boolean negrito;
    public DialogPresenter(DialogContract.View view, Context context) {
        this.view = view;
        this.context = context;
    }


    @Override
    public void alter(String tela, String email) {
        if (tela == "email"){
            tv1 = "COMPROVANTE ENVIADO";
            tv2 = "COM SUCESSO PARA O E-MAIL:";
            tv3 = email;
            negrito = true;
        }
        if (tela == "Resumer"){
            tv1 = "VENDA";
            tv2 = "EFETUADA COM SUCESSO";
            tv3 = null;
        }
        if (tela == "reprocessingSucess"){
            tv1 = "REPROCESSAMENTO";
            tv2 = "EFETUADO COM SUCESSO";
            tv3 = null;
        } if (tela == "reprocessingError"){
            tv1 = "PROBLEMAS ENCONTRADOS";
            tv2 = "AO REPROCESSAR ALGUMAS";
            tv3 = "VENDAS, TENTE NOVAMENTE";
            negrito = false;
        }
        if (tela == "ReprocessamentoResumer"){
            tv1 = "PROBLEMAS ENCONTRADOS";
            tv2 = "AO EFETUAR VENDA";
            tv3 = "VERIFIQUE O REPROCESSAMENTO";
            negrito = false;
        }
        view.altText(tv1,tv2,tv3, negrito);
    }
}
