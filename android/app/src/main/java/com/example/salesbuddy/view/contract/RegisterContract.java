package com.example.salesbuddy.view.contract;

import com.example.salesbuddy.model.ItemsModel;

import java.util.List;

public interface RegisterContract {

    interface View{
        //Fechar pagina (Falta Itens)
        void previosRegister();
        //Mensagem do token
        void showToastRegister(String menssage);
        void showMenuDialog();

        void update(String nome,String cpf,String email,String valor_venda,String valor_recebido, String title, List<ItemsModel> itens);
    }
    interface Presenter{
        //Registar venda
        void register(String name, String cpf, String email, String saleValue, String amountReceived, List<ItemsModel> itens);
        //voltar para pagina anterio
        void backRegister();

        void onMenuButtonClicked();

        void updateconfirm(boolean isUpdate, String name, String cpf, String email, String saleValue, String amountReceived, List<ItemsModel> itens);

    }
}
