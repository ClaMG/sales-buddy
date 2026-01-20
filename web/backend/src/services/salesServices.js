import {findByIdSales, createSales} from '../dao/salesDAO.js'
import { validarEmail} from '../utils/authUtils.js'

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
	if(!dados || !dados.nome || !dados.cpf || !dados.email || !dados.valor_venda || !dados.valor_recebido ){
	throw new Error("Preencha todos os campo.");
}

    const fomatoEmail = validarEmail(dados.email)

    if(!fomatoEmail){
        throw new Error("Email com o fomato errado, deve conter o @ e .com")
    }

    if(dados.valor_venda> dados.valor_recebido){
	    throw new Error("Valor de venda não foi pago .");
    }

    const quantidadeItens = dados.itens ? dados.itens.length : 0;

    const dadosParaSalvar = {
        nome: dados.nome,
        cpf: dados.cpf,
        email: dados.email,
        quantidade: quantidadeItens,
        valor_venda: dados.valor_venda,
        valor_recebido: dados.valor_recebido,
        troco: dados.troco,
        itens: dados.itens || []
    };

    const vendaCriada = await createSales( dadosParaSalvar );
    if(!vendaCriada){
        throw new Error("Erro ao criar a venda.");
    }



return vendaCriada;

}

