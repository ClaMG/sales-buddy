import e from 'express';
import {findByIdSales, createSales,updateReprocessing, createReprocessing, findSaleIdByMatch, findByIdReprocessing} from '../dao/salesDAO.js'
import { enviarEmailComprovante, } from '../utils/authUtils.js'

export async function saleById(id){
    if(!id){
        throw new Error("Nenhum id encontrado.");
    }

    const vendaExistente= await findByIdSales(id.id)

    if(!vendaExistente){
             throw new Error(`Venda não encontrado.`);
    }

    return vendaExistente
    
}

export async function createSalesService(dados){
	if(!dados || !dados.nomeCliente || !dados.cpf || !dados.email || !dados.valorVenda || !dados.valorRecebido ){
	throw new Error("Preencha todos os campo.");
}


    if (dados.valorVenda > dados.valorRecebido) {
    throw new Error("Valor de venda não foi pago.");
    }

    const quantidadeCalculada = dados.itens ? dados.itens.length : 0;

    const dadosParaSalvar = {
        nome: dados.nomeCliente,         
        cpf: dados.cpf,
        email: dados.email,        
        quantidade: quantidadeCalculada, 
        valorVenda: dados.valorVenda,
        valorRecebido: dados.valorRecebido,
        troco: dados.troco || 0,
        itens: dados.itens
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
    const quantidadeItens = comprovante.itens ? comprovante.itens.length : 0;

    const dados = {
        nomeCliente: comprovante.nomeCliente,
        cpf: comprovante.cpf,
        email: destinatario,
        quantidade: quantidadeItens,
        valorVenda: comprovante.valorVenda,
        valorRecebido: comprovante.valorRecebido,
        troco: comprovante.troco
    };

    const pesquisarVenda = await findSaleIdByMatch(dados);

    if (!pesquisarVenda ||pesquisarVenda.length === 0) {
        throw new Error("Nenhuma venda correspondente encontrada.");
    }

    const idVenda = pesquisarVenda[pesquisarVenda.length - 1].id;


    const comprovanteCompleto = {
        nome: comprovante.nomeCliente,
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
        itens: dados.itens || [],
        reprocessado: false
    };

    const reprocessamentoCriado = await createReprocessing( dadosParaSalvar );
    if(!reprocessamentoCriado){
        throw new Error("Erro ao criar o reprocessamento.");
    }

    

    return reprocessamentoCriado;

}

export async function reprocessingService(dados){
    if(!dados || !(Array.isArray(dados.id)) || dados.id.length === 0){
        throw new Error("ID do reprocessamento é obrigatório.");
    }

    const concluidos = []; 
    const pendentes = [];

    for (const id of dados.id) {
        try {
            const reprocessamento = await findByIdReprocessing(id);
            
            if (!reprocessamento) {
                console.error(`ID ${id} não encontrado. Pulando...`);
                continue; 
            }

            if (reprocessamento.reprocessado) {
                concluidos.push({ id, status: "Já estava processado" });
                continue;
            }

            const quantidadeItens = reprocessamento.itens ? reprocessamento.itens.length : 0;

           
            const dadosParaSalvar = {
                nome: reprocessamento.nome,
                cpf: reprocessamento.cpf,
                email: reprocessamento.email,
                quantidade: quantidadeItens,
                valorRecebido: reprocessamento.valorRecebido ,
                valorVenda: reprocessamento.valorVenda ,
                troco: reprocessamento.troco,
                itens: reprocessamento.itens ? reprocessamento.itens.map(item => ({
                    descricao: item.descricao 
        
                    })) : []
            };

            const novaVenda = await createSales(dadosParaSalvar);
            
            if (!novaVenda) {
                throw new Error(`Falha ao criar venda para o ID ${id}`);
            }
            
            const atualizarStatus = await updateReprocessing(id, true);
            if (!atualizarStatus) {
                throw new Error(`Falha ao atualizar o status do reprocessamento para o ID ${id}`);
            }

            concluidos.push({ id, status: "Processado com sucesso" });

        } catch (error) {
            pendentes.push({ id, motivo: error.message });
        }
    }

    return { 
        concluido: concluidos, 
        pendentes: pendentes }; 
}

