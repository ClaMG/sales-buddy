import nodemailer from 'nodemailer';

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
        <div style="font-family: 'Arial', sans-serif; background-color: #F9FBE7; padding: 20px; width: 400px; border-radius: 8px; color: #333;">
            
            <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
                <tr>
                    <td style="width: 60%; vertical-align: top;">
                        <small style="color: #888; font-size: 12px;">Nome</small><br>
                        <strong style="font-size: 14px;">${comprovante.nomeCliente}</strong>
                    </td>
                    <td style="width: 40%; vertical-align: top; text-align: right;">
                        <small style="color: #888; font-size: 12px;">CPF</small><br>
                        <strong style="font-size: 14px;">${comprovante.cpf}</strong>
                    </td>
                </tr>
            </table>

            <div style="margin-bottom: 20px;">
                <small style="color: #888; font-size: 12px;">E-mail</small><br>
                <strong style="font-size: 14px;">${destinatario}</strong>
            </div>

            <hr style="border: 0; border-top: 1px solid #333; margin: 15px 0;">

            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr style="color: #888; font-size: 12px;">
                        <th style="width: 40px; padding-bottom: 5px;">Itm</th>
                        <th style="padding-bottom: 5px;">Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    ${itensHtml}
                </tbody>
            </table>

            <hr style="border: 0; border-top: 1px solid #333; margin: 15px 0;">

            <table style="width: 100%; font-weight: bold; font-size: 14px;">
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
                Venda nº ${comprovante.idVenda} - Obrigado pela preferência!
            </div>
        </div>
    `
};

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
       console.error("ERRO NO TRANSPORTE DE EMAIL:", error); // ADICIONE ISSO
        return false;
    }
}


