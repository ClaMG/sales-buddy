package com.example.salesbuddy.request;
import com.example.salesbuddy.model.SalesModel;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface SalesService {

    @POST("sales/create")
    Call<SalesModel> registrarSales(@Body SalesModel venda);

    @POST("sales/enviar_comprovante")
    Call<SalesModel> emailSales(@Body SalesModel venda);

    @POST("sales/comprovante_mobile")
    Call<SalesModel> getSales(@Body SalesModel venda);

    @POST("sales/create_reprocessing")
    Call<SalesModel> enviarReprocessing(@Body SalesModel venda);

    @POST("sales/reprocessing")
    Call<SalesModel> reprocessing(@Body SalesModel id);


    @GET("sales/reprocessings")
    Call<List<SalesModel>> buscarTodosReprocessamentos();

}
