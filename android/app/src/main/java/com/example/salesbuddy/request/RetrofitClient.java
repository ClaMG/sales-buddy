package com.example.salesbuddy.request;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor; // Importe isso
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    private static Retrofit retrofit = null;

    public static Retrofit getClient() {
        if (retrofit == null) {
            //Criar o interceptor de LOG
            HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
            logging.setLevel(HttpLoggingInterceptor.Level.BODY); // Mostra o corpo do JSON

            //Adicionar o interceptor ao cliente HTTP
            OkHttpClient client = new OkHttpClient.Builder()
                    .addInterceptor(logging)
                    .build();

            //Construir o Retrofit usando esse cliente
            retrofit = new Retrofit.Builder()
                    .baseUrl("http://172.19.96.1:3000/")
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(client) // NÃO ESQUEÇA DESTA LINHA
                    .build();
        }
        return retrofit;
    }
}