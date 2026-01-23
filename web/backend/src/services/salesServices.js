import {findByIdSales, createSales, findBySalesName} from '../dao/salesDAO.js'
import { validarEmail, enviarEmailComprovante, validarCPF} from '../utils/authUtils.js'

export async function saleById(id){
    if(!id){
        throw new Error("Nenhum id encontrado.");
    }

    const vendaExistente= await findByIdSales(id)

    if(!vendaExistente){
             throw new Error(`Venda não encontrado.`);
    }

    return vendaExistente
    
}

export async function createSalesService(dados){
	if(!dados || !dados.nomeCliente || !dados.cpf || !dados.email || !dados.valorVenda || !dados.valorRecebido ){
	throw new Error("Preencha todos os campo.");
}

    const fomatoEmail = validarEmail(dados.email)

    if(!fomatoEmail){
        throw new Error("Email com o fomato errado, deve conter o @ e .com")
    }

    const cpfValido = validarCPF(dados.cpf);
    if (!cpfValido) {
        throw new Error("CPF inválido.");
    }

    if(dados.valorVenda> dados.valorRecebido){
	    throw new Error("Valor de venda não foi pago.");
    }

    const quantidadeItens = dados.itens ? dados.itens.length : 0;

    const dadosParaSalvar = {
        nome: dados.nomeCliente,
        cpf: cpfValido,
        email: dados.email,
        quantidade: quantidadeItens,
        valor_venda: dados.valorVenda,
        valor_recebido: dados.valorRecebido,
        troco: dados.troco,
        itens: dados.itens || []
    };

    const vendaCriada = await createSales( dadosParaSalvar );
    if(!vendaCriada){
        throw new Error("Erro ao criar a venda.");
    }



return vendaCriada;

}

export async function enviarComprovantePagamento(comprovante) {
    if (!comprovante || !comprovante.nomeCliente || !comprovante.cpf || !comprovante.email || !comprovante.valorVenda || !comprovante.valorRecebido) {
        throw new Error("Preencha todos os campos.");
    }

    const destinatario = comprovante.email;

    const saleExists = await findBySalesName(comprovante.nomeCliente);
    if (!saleExists) {
        throw new Error("Venda não encontrada para o cliente fornecido.");
    }

    const fomatoEmail = validarEmail(destinatario);
    if (!fomatoEmail) {
        throw new Error("Email com o formato errado, deve conter o @ e .com");
    }

    const cpfValido = validarCPF(comprovante.cpf);
    if (!cpfValido) {
        throw new Error("CPF inválido.");
    }

    const comprovanteCompleto = {
        nomeCliente: comprovante.nomeCliente,
        cpf: cpfValido,
        email: destinatario,
        itens: comprovante.itens || [],
        valorRecebido: comprovante.valorRecebido || 0,
        valorVenda: comprovante.valorVenda || 0,
        troco: comprovante.troco || 0,
        idVenda: saleExists.id
    };


    const emailEnviado = await enviarEmailComprovante(destinatario, comprovanteCompleto);
    if (!emailEnviado) {
        throw new Error("Erro ao enviar e-mail com o comprovante de pagamento");
    }
    return emailEnviado;
}

