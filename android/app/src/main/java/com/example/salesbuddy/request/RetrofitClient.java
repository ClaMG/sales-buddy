package com.example.salesbuddy.request;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor; // Importe isso
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    private static Retrofit retrofit = null;

    public static Retrofit getClient() {
        if (retrofit == null) {
            // 1. Criar o interceptor de LOG
            HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
            logging.setLevel(HttpLoggingInterceptor.Level.BODY); // Mostra o corpo do JSON

            // 2. Adicionar o interceptor ao cliente HTTP
            OkHttpClient client = new OkHttpClient.Builder()
                    .addInterceptor(logging)
                    .build();

            // 3. Construir o Retrofit usando esse cliente
            retrofit = new Retrofit.Builder()
                    .baseUrl("http://10.0.2.2:3000/")
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(client) // NÃO ESQUEÇA DESTA LINHA
                    .build();
        }
        return retrofit;
    }
}