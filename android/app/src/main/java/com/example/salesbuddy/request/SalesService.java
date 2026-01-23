package com.example.salesbuddy.request;
import com.example.salesbuddy.model.SalesModel;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface SalesService {

    @POST("sales/create")
    Call<SalesModel> registrarSales(@Body SalesModel venda);

    @POST("sales/enviar_comprovante")
    Call<SalesModel> emailSales(@Body SalesModel venda);

}
