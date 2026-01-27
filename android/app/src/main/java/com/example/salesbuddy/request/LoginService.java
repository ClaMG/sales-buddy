package com.example.salesbuddy.request;

import com.example.salesbuddy.model.LoginModel;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Headers;
import retrofit2.http.POST;
public interface LoginService {

    @Headers("Content-Type: application/json")
    @POST("user/login")
    Call<LoginModel> fazerLogin(@Body LoginModel loginDados);
}
