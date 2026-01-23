package com.example.salesbuddy.request;

import com.example.salesbuddy.model.LoginModel;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;
public interface LoginService {

    @POST("user/login")
    Call<LoginModel> fazerLogin(@Body LoginModel loginDados);
}
