import {findByIdSales} from '../dao/salesDAO.js'

export async function comprovante(id){
    if(!id){
        throw new Error("Nenhum id encontrado para gerar o comprovante.");
    }

    const comprovante = await findByIdSales(id)

    if(!comprovante){
             throw new Error(`Comprovante não encontrado.`);
    }

    return comprovante
    
}