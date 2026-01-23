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

//Pesquisa pelo nome
export async function findBySalesName(nomeCliente) {
    return await Sale.findOne({
        where: { nome: nomeCliente },
        attributes: ['id'] 
    });
}

//Criar uma nova venda
export async function createSales(dados) {
    return await Sale.create(dados,{
         include: [{ model: ItemSales, as: 'itens' }]
    });
}