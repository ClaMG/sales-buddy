import { Sale, ItemSales } from "../models/implementSales.js";

//Buscar todas as vendas
export async function findAllSales() {
    return await Sale.findAll({
         include: [{ model: ItemSales, as: 'itens' }]
    });
}

//Pesquisar por id
export async function findByIdSales(id) {
    return await Sale.findOne({
        where: { id: id },
        include: [{ model: ItemSales, as: 'itens' }]
       
    });
}



//temporario

export async function createSales(dados) {
    return await Sale.create(dados,{
         include: [{ model: ItemSales, as: 'itens' }]
    });
}