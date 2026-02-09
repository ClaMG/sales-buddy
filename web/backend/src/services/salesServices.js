import e from 'express';
import {findByIdSales, createSales,updateReprocessing, createReprocessing, findSaleIdByMatch, findByIdReprocessing} from '../dao/salesDAO.js'
import { sendEmailProof } from '../utils/emailUtils.js'
import {validateCPF} from '../utils/validateUtils.js'

export async function saleById(id){
    if(!id){
        throw new Error("Nenhum id encontrado.");
    }

    const saleExisting= await findByIdSales(id.id)

    if(!saleExisting){
             throw new Error(`Venda não encontrado.`);
    }

    return saleExisting
    
}

export async function createSalesService(dados){
	if(!dados || !dados.nomeCliente || !dados.cpf || !dados.email || !dados.valorVenda || !dados.valorRecebido ){
	throw new Error("Preencha todos os campo.");
}
    const validateCpf = validateCPF(dados.cpf)

    if(!validateCpf){
        throw new Error("Formato de cpf invalido.")
    }

    if (dados.valorVenda > dados.valorRecebido) {
        throw new Error("Valor de venda não foi pago.")
    }

    if(dados.valorVenda <= 0 ){
        throw new Error("Valor de venda não pode ser igual ou menor a 0.");
    }

    const quantityCalculated = dados.itens ? dados.itens.length : 0;

    const dataToSave = {
        nome: dados.nomeCliente,         
        cpf: dados.cpf,
        email: dados.email,        
        quantidade: quantityCalculated, 
        valorVenda: dados.valorVenda,
        valorRecebido: dados.valorRecebido,
        troco: dados.troco || 0,
        itens: dados.itens
    };

    const saleCreated = await createSales( dataToSave );
    if(!saleCreated){
        throw new Error("Erro ao criar a venda.");
    }

return saleCreated;

}

export async function sendProofPayment(comprovante) {
    if (!comprovante || !comprovante.nomeCliente || !comprovante.cpf || !comprovante.email ||
         !comprovante.valorVenda || !comprovante.valorRecebido 
        || !comprovante.itens || !comprovante.troco) {
        throw new Error("Preencha todos os campos.");
    }

    const validateCpf = validateCPF(comprovante.cpf)

    if(!validateCpf){
        throw new Error("Formato de cpf invalido.")
    }

    if (comprovante.valorVenda > comprovante.valorRecebido) {
        throw new Error("Valor de venda não foi pago.")
    }

    if(comprovante.valorVenda <= 0 ){
        throw new Error("Valor de venda não pode ser igual ou menor a 0.");
    }

    const recipient = comprovante.email;
    const quantityItems = comprovante.itens ? comprovante.itens.length : 0;

    const data = {
        nomeCliente: comprovante.nomeCliente,
        cpf: comprovante.cpf,
        email: recipient,
        quantidade: quantityItems,
        valorVenda: comprovante.valorVenda,
        valorRecebido: comprovante.valorRecebido,
        troco: comprovante.troco
    };

    const searchSale = await findSaleIdByMatch(data);

    if (!searchSale ||searchSale.length === 0) {
        throw new Error("Nenhuma venda correspondente encontrada.");
    }

    const idSale = searchSale[searchSale.length - 1].id;


    const proofComplete = {
        nome: comprovante.nomeCliente,
        cpf: comprovante.cpf,
        email: recipient,
        itens: comprovante.itens || [],
        valorRecebido: comprovante.valorRecebido || 0,
        valorVenda: comprovante.valorVenda || 0,
        troco: comprovante.troco || 0,
        idVenda: idSale
    };


    const emailSent = await sendEmailProof(recipient, proofComplete);
    if (!emailSent) {
        throw new Error("Erro ao enviar e-mail com o comprovante de pagamento");
    }
    return emailSent;
}

export async function sendProofMobile(dados) {
    if (!dados || !dados.nomeCliente || !dados.cpf || !dados.email || !dados.valorVenda || !dados.valorRecebido || !dados.itens || !dados.troco) {
        throw new Error("Preencha todos os campos.");
    }

   const quantityItems = dados.itens ? dados.itens.length : 0;

   const validateCpf = validateCPF(dados.cpf)

    if(!validateCpf){
        throw new Error("Formato de cpf invalido.")
    }

    if (dados.valorVenda > dados.valorRecebido) {
        throw new Error("Valor de venda não foi pago.")
    }

    if(dados.valorVenda <= 0 ){
        throw new Error("Valor de venda não pode ser igual ou menor a 0.");
    }

    const dataToSave = {
        nomeCliente: dados.nomeCliente,
        cpf: dados.cpf,
        email: dados.email,
        quantidade: quantityItems,
        valorVenda: dados.valorVenda,
        valorRecebido: dados.valorRecebido,
        troco: dados.troco,
        itens: dados.itens || []
    };

    const searchSale = await findSaleIdByMatch(dataToSave);

    if (!searchSale ||searchSale.length === 0) {
        throw new Error("Nenhuma venda correspondente encontrada.");
    }

    // Pega o ID da última venda correspondente
    const idFinal = searchSale.length > 0 ? searchSale[searchSale.length - 1].id : null;

    return idFinal;
}

export async function createReprocessingService(dados){
    if(!dados || !dados.nomeCliente || !dados.cpf || !dados.email || !dados.valorVenda || !dados.valorRecebido ){
    throw new Error("Preencha todos os campo.");
    }

    if (dados.valorVenda > dados.valorRecebido) {
    throw new Error("Valor de venda não foi pago.");
    }

    const validateCpf = validateCPF(dados.cpf)

    if(!validateCpf){
        throw new Error("Formato de cpf invalido.")
    }

    if(dados.valorVenda <= 0 ){
        throw new Error("Valor de venda não pode ser igual ou menor a 0.");
    }

    const quantityItems = dados.itens ? dados.itens.length : 0;

    const dataToSave = {
        nome: dados.nomeCliente,
        cpf: dados.cpf,
        email: dados.email,
        quantidade: quantityItems,
        valorVenda: dados.valorVenda,
        valorRecebido: dados.valorRecebido,
        troco: dados.troco,
        itens: dados.itens || [],
        reprocessado: false
    };

    const reprocessingCreated = await createReprocessing( dataToSave );
    if(!reprocessingCreated){
        throw new Error("Erro ao criar o reprocessamento.");
    }

    return reprocessingCreated;

}

export async function reprocessingService(dados){
    if(!dados || !(Array.isArray(dados.id)) || dados.id.length === 0){
        throw new Error("ID do reprocessamento é obrigatório.");
    }

    const completed = []; 
    const pending = [];

    for (const id of dados.id) {
        try {
            const reprocessing = await findByIdReprocessing(id);
            
            if (!reprocessing) {
                console.error(`ID ${id} não encontrado. Pulando...`);
                continue; 
            }

            if (reprocessing.reprocessado) {
                completed.push({ id, status: "Já estava processado" });
                continue;
            }

            const quantityItems = reprocessing.itens ? reprocessing.itens.length : 0;

           
            const dataToSave = {
                nome: reprocessing.nome,
                cpf: reprocessing.cpf,
                email: reprocessing.email,
                quantidade: quantityItems,
                valorRecebido: reprocessing.valorRecebido ,
                valorVenda: reprocessing.valorVenda ,
                troco: reprocessing.troco,
                itens: reprocessing.itens ? reprocessing.itens.map(item => ({
                    descricao: item.descricao 
        
                    })) : []
            };

            const newSale = await createSales(dataToSave);
            
            if (!newSale) {
                throw new Error(`Falha ao criar venda para o ID ${id}`);
            }
            
            const updateStatus = await updateReprocessing(id, true);
            if (!updateStatus) {
                throw new Error(`Falha ao atualizar o status do reprocessamento para o ID ${id}`);
            }

            completed.push({ id, status: "Processado com sucesso" });

        } catch (error) {
            pending.push({ id, motivo: error.message });
        }
    }

    return { 
        concluido: completed , 
        pendentes: pending }; 
}

