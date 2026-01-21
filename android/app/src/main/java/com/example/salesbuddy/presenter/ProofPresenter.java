package com.example.salesbuddy.presenter;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.net.Uri;
import android.view.View;

import androidx.core.content.FileProvider;

import com.example.salesbuddy.model.SalesModel;
import com.example.salesbuddy.view.RegisterActivity;
import com.example.salesbuddy.view.ResumerActivity;
import com.example.salesbuddy.view.contract.ProofContract;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class ProofPresenter implements ProofContract.Presenter {
    private final ProofContract.View view;
    private Context context;

    private String name;
    private String cpf;
    private String email;
    private String valueReceived;
    private String valueSales;
    private String change;
    private String idNum;

    private final SalesModel model;


    public ProofPresenter(ProofContract.View view, Context context) {
        this.view = view;
        this.context = context;
        this.model = new SalesModel();
    }

    @Override
    public void getInfo() {
        name = model.getName();
        cpf = model.getCpf();
        email = model.getEmail();
        valueReceived = String.valueOf(model.getValue_received());
        valueSales = String.valueOf(model.getSale_value());
        change = String.valueOf(model.getChange());
        idNum = String.valueOf(model.getId());
        //trocar para pegar do banco de dados


        view.printInfo(name, cpf, email, valueReceived, valueSales, change, idNum);
    }

    @Override
    public void no() {
        Intent intent = new Intent(context, RegisterActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosProof();
    }

    public Bitmap takeScreenShot(View view) {
        // Cria o Bitmap com o tamanho da view
        Bitmap bitmap = Bitmap.createBitmap(view.getWidth(), view.getHeight(), Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        view.draw(canvas);
        return bitmap;
    }

    @Override
    public void yes(View LayoutProof) {
        Bitmap bitmap = takeScreenShot(LayoutProof);


        //Salvar cache
        File imageFile = new File(context.getCacheDir(), "screenshot.png");
        try {
            FileOutputStream fos = new FileOutputStream(imageFile);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);
            fos.flush();
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        //Obtem uri (decobrir que pacote é esse)
        Uri uri = FileProvider.getUriForFile(context, "com.seu.pacote.fileprovider", imageFile);

        //Cria o email
        Intent emailIntent = new Intent(Intent.ACTION_SEND);
        emailIntent.setType("image/png");
        emailIntent.putExtra(Intent.EXTRA_EMAIL, new String[]{model.getEmail()});
        emailIntent.putExtra(Intent.EXTRA_SUBJECT, "Comprovante da venda");
        emailIntent.putExtra(Intent.EXTRA_TEXT, "Segue anexo o comprovante da venda.");
        emailIntent.putExtra(Intent.EXTRA_STREAM, uri);
        emailIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);



        //Ativar o dilog
    }




    @Override
    public void backProof() {
        Intent intent = new Intent(context, ResumerActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        context.startActivity(intent);
        view.previosProof();
    }
}
