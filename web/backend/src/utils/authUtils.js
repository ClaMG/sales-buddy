import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

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

//Formata o cnpj
export const formatarCNPJ = (cnpj) => {
    const limpo = cnpj.replace(/\D/g, ''); // Garante que só existam números
    return limpo
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1'); // Limita o tamanho
};


//Gera senha aleatoria
export const gerarSenhaAleatoria = (tamanho) => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    // No Node, usamos crypto.randomBytes
    return Array.from({ length: tamanho }, () => {
        const randomIndex = crypto.randomInt(0, caracteres.length);
        return caracteres[randomIndex];
    }).join('');
};

//Configuração do nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER || "erick.galdino@gfxconsultoria.com",
        pass: process.env.EMAIL_PASS || 'mtur zfov ikpk qjyx'
    }
});

//Enviar email com a nova senha
export async function enviarEmailSenha(destinatario, nomeUsuario, novaSenha) {
    const remetente = process.env.EMAIL_USER || "erick.galdino@gfxconsultoria.com";

    try {
        await transporter.verify();

        const mailOptions = {
            from: remetente,
            to: destinatario,
            subject: "Sua Nova Senha de Acesso",
            html: `
                <h1>Olá, ${nomeUsuario}!</h1>
                <p>Uma nova senha foi gerada para o seu acesso ao sistema.</p>
                <p>Sua nova senha é: <strong>${novaSenha}</strong></p>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
}


//Enviar email com o comprovante de pagamento
export async function enviarEmailComprovante(destinatario, comprovante) {
    const remetente = process.env.EMAIL_USER || "erick.galdino@gfxconsultoria.com";

    const itensHtml = comprovante.itens.map((item, index) => `
        <tr style="color: #555;">
            <td style="padding: 5px 0;">${String(index + 1).padStart(2, '0')}</td>
            <td style="padding: 5px 0;">${item.descricao}</td>
        </tr>
    `).join('');

    try {
        await transporter.verify();

        const mailOptions = {
            from: remetente,
            to: destinatario,
            subject: "Comprovante de Pagamento - SalesBuddy",
            html: `
                <div style="font-family: 'Montserrat', sans-serif; background-color: #F9FBE7; padding: 20px; width: 400px; border-radius: 8px; color: #333;">
                    
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                        <div>
                            <small style="color: #888;">Nome</small><br>
                            <strong>${comprovante.nomeCliente}</strong>
                        </div>
                        <div>
                            <small style="color: #888;">CPF</small><br>
                            <strong>${comprovante.cpf}</strong>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <small style="color: #888;">E-mail</small><br>
                        <strong>${destinatario}</strong>
                    </div>

                    <hr style="border: 0; border-top: 1px solid #333; margin: 15px 0;">

                    <table style="width: 100%; border-collapse: collapse; text-align: left;">
                        <thead>
                            <tr style="color: #888; font-size: 12px;">
                                <th style="width: 40px;">Itm</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itensHtml}
                        </tbody>
                    </table>

                    <hr style="border: 0; border-top: 1px solid #333; margin: 15px 0;">

                    <table style="width: 100%; font-weight: bold;">
                        <tr>
                            <td style="padding: 5px 0;">Valor recebido</td>
                            <td style="text-align: right;">R$ ${comprovante.valorRecebido.toFixed(2).replace('.', ',')}</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 0;">Valor venda</td>
                            <td style="text-align: right;">R$ ${comprovante.valorVenda.toFixed(2).replace('.', ',')}</td>
                        </tr>
                        <tr style="color: #555;">
                            <td style="padding: 5px 0;">Troco devido</td>
                            <td style="text-align: right;">R$ ${comprovante.troco.toFixed(2).replace('.', ',')}</td>
                        </tr>
                    </table>

                    <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #555;">
                        Venda nº ${comprovante.numeroVenda}
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
}

//Verificar o CPF 
export function validarCPF(cpf) {
    const limpo = String(cpf).replace(/\D/g, ''); // Remove máscara
    if (limpo.length !== 11 || /^(\d)\1{10}$/.test(limpo)) return false;

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(limpo.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(limpo.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(limpo.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(limpo.substring(10, 11))) return false;

    return true;
}
