import {findByIdSales} from '../dao/salesDAO.js'

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
