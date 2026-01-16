import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

// Transforma a senha 
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compara a senha 
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

//Conferir formato do email
export const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

//Confere valida e aplica a mascara do cnpj
export const validarCNPJ = (cnpj) => {
    const cnpjLimpo = cnpj.replace(/\D/g, ''); 
    return cnpjLimpo.length === 14;
};

export const formatarCNPJ = (cnpj) => {
    const limpo = cnpj.replace(/\D/g, ''); // Garante que só existam números
    return limpo
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1'); // Limita o tamanho
};

import crypto from 'crypto';

export const gerarSenhaAleatoria = (tamanho) => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    // No Node, usamos crypto.randomBytes
    return Array.from({ length: tamanho }, () => {
        const randomIndex = crypto.randomInt(0, caracteres.length);
        return caracteres[randomIndex];
    }).join('');
};


const transporter = nodemailer.createTransport({
    host: "erick.galdino@gfxconsultoria.com", // Ou o host do seu serviço
    port: 465,
    secure: true, // true para porta 465
    auth: {
        user: process.env.EMAIL_USER || "erick.galdino@gfxconsultoria.com", // Seu e-mail no .env
        pass: process.env.EMAIL_PASS || 'mtur zfov ikpk qjyx'  // Sua senha de app no .env
    }
});

export async function enviarEmailSenha(destinatario, nomeUsuario, novaSenha) {
    const mailOptions = {
        from: '"Sistema de Vendas" <seu-email@gmail.com>',
        to: destinatario,
        subject: "Sua Nova Senha de Acesso",
        html: `
            <h1>Olá, ${nomeUsuario}!</h1>
            <p>Uma nova senha foi gerada para o seu acesso ao sistema.</p>
            <p>Sua nova senha é: <strong>${novaSenha}</strong></p>
            <br>
            <p>Recomendamos que você altere esta senha após o primeiro login.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("E-mail enviado com sucesso!");
        return true;
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return false;
    }
}
