package com.example.salesbuddy.view.contract;

public interface RegisterContract {

    interface View{
        //Fechar pagina (Falta Itens)
        void previosRegister();
        //Mensagem do token
        void showToastRegister(String menssage);

        void update(String nome,String cpf,String email,String valor_venda,String valor_recebido, String title);
    }
    interface Presenter{
        //Registar venda
        void register(String nome,String cpf,String email,String valor_venda,String valor_recebido);
        //voltar para pagina anterio
        void backRegister();
        void testUpdate();
    }
}
