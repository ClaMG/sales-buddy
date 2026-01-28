import e from 'express';
import {findByIdSales, createSales, createReprocessing, findSaleIdByMatch, deleteReprocessing, findByIdReprocessing} from '../dao/salesDAO.js'
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


    if (dados.valorVenda > dados.valorRecebido) {
    throw new Error("Valor de venda não foi pago.");
    }

    const quantidadeItens = dados.itens ? dados.itens.length : 0;

    const dadosParaSalvar = {
        nome: dados.nomeCliente,
        cpf: dados.cpf,
        email: dados.email,
        quantidade: quantidadeItens,
        valorVenda: dados.valorVenda,
        valorRecebido: dados.valorRecebido,
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
    if (!comprovante || !comprovante.nomeCliente || !comprovante.cpf || !comprovante.email || !comprovante.valorVenda || !comprovante.valorRecebido 
        || !comprovante.itens || !comprovante.troco) {
        throw new Error("Preencha todos os campos.");
    }

    const destinatario = comprovante.email;

    const dados = {
        nomeCliente: comprovante.nomeCliente,
        cpf: comprovante.cpf,
        email: comprovante.email,
        quantidade: comprovante.itens.length,
        valorVenda: comprovante.valorVenda,
        valorRecebido: comprovante.valorRecebido,
        troco: comprovante.troco
    };

    const pesquisarVenda = await findSaleIdByMatch(dados);

    if (!pesquisarVenda ||pesquisarVenda.length === 0) {
        throw new Error("Nenhuma venda correspondente encontrada.");
    }

    const idVenda = pesquisarVenda[pesquisarVenda.length - 1].id;

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
        cpf: comprovante.cpf,
        email: destinatario,
        itens: comprovante.itens || [],
        valorRecebido: comprovante.valorRecebido || 0,
        valorVenda: comprovante.valorVenda || 0,
        troco: comprovante.troco || 0,
        idVenda: idVenda
    };


    const emailEnviado = await enviarEmailComprovante(destinatario, comprovanteCompleto);
    if (!emailEnviado) {
        throw new Error("Erro ao enviar e-mail com o comprovante de pagamento");
    }
    return emailEnviado;
}

export async function enviarComprovanteMobile(dados) {
    if (!dados || !dados.nomeCliente || !dados.cpf || !dados.email || !dados.valorVenda || !dados.valorRecebido || !dados.itens || !dados.troco) {
        throw new Error("Preencha todos os campos.");
    }
    const emailValido = validarEmail(dados.email);

    if (!emailValido) {
        throw new Error("Email com o formato errado, deve conter o @ e .com");
    }

    const cpfValido = validarCPF(dados.cpf);
    if (!cpfValido) {
        throw new Error("CPF inválido.");
    }

   const quantidadeItens = dados.itens ? dados.itens.length : 0;

    const dadosParaSalvar = {
        nomeCliente: dados.nomeCliente,
        cpf: dados.cpf,
        email: dados.email,
        quantidade: quantidadeItens,
        valorVenda: dados.valorVenda,
        valorRecebido: dados.valorRecebido,
        troco: dados.troco,
        itens: dados.itens || []
    };

    const pesquisarVenda = await findSaleIdByMatch(dadosParaSalvar);

    if (!pesquisarVenda ||pesquisarVenda.length === 0) {
        throw new Error("Nenhuma venda correspondente encontrada.");
    }

    // Pega o ID da última venda correspondente
    const idFinal = pesquisarVenda.length > 0 ? pesquisarVenda[pesquisarVenda.length - 1].id : null;

    return idFinal;
}

export async function createReprocessingService(dados){
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


    if (dados.valorVenda > dados.valorRecebido) {
    throw new Error("Valor de venda não foi pago.");
    }

    const quantidadeItens = dados.itens ? dados.itens.length : 0;

    const dadosParaSalvar = {
        nome: dados.nomeCliente,
        cpf: dados.cpf,
        email: dados.email,
        quantidade: quantidadeItens,
        valorVenda: dados.valorVenda,
        valorRecebido: dados.valorRecebido,
        troco: dados.troco,
        itens: dados.itens || []
    };

    const reprocessamentoCriado = await createReprocessing( dadosParaSalvar );
    if(!reprocessamentoCriado){
        throw new Error("Erro ao criar o reprocessamento.");
    }

    return reprocessamentoCriado;

}

export async function reprocessingService(dados){
    if(!dados || !dados.id){
        throw new Error("ID do reprocessamento é obrigatório.");
    }
    const id = dados.id;

    const reprocessamento = await findByIdReprocessing(id);
    if (!reprocessamento) {
        throw new Error("Registro de reprocessamento não encontrado.");
    }

    const quantidadeItens = reprocessamento.itens ? reprocessamento.itens.length : 0;

    const dadosParaSalvar = {
        nome: reprocessamento.nome,
        cpf: reprocessamento.cpf,
        email: reprocessamento.email,
        quantidade: quantidadeItens,
        itens: reprocessamento.itens || [],
        valorRecebido: reprocessamento.valorRecebido || 0,
        valorVenda: reprocessamento.valorVenda || 0,
        troco: reprocessamento.troco || 0
    };

    const criarVenda = await createSales(dadosParaSalvar);

    if(!criarVenda){
        throw new Error("Erro ao criar a venda a partir do reprocessamento.");
    }

    //deletar o reprocessamento após criar a venda
    const deletarReprocessamento = await deleteReprocessing(dados.id);

    if(!deletarReprocessamento){
        throw new Error("Erro ao deletar o reprocessamento após criar a venda.");
    }


    return criarVenda;
}
