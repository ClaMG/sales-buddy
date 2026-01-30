package com.example.salesbuddy.view.contract;

public interface DialogContract {
    interface View{
        void altText (String tv1, String tv2, String tv3,  boolean negrito );
    }
    interface Presente{
        void alter(String tela,String email);
    }
}
