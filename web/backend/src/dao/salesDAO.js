import { Sale, ItemSales } from "../models/implementSales.js";
import { Reprocessing, ItemReprocessing } from "../models/implementReprocessing.js";

//Buscar todas as vendas
export async function findAllSales() {
    return await Sale.findAll({
        include: [{ model: ItemSales, as: 'itens' }],
        order: [['id', 'ASC']] 
    });
}

//Buscar todos os reprocessamentos
export async function findAllReprocessing() {
    return await Reprocessing.findAll({
         include: [{ model: ItemReprocessing, as: 'itens' }]
    });
}

//Pesquisar por id
export async function findByIdSales(id) {
    return await Sale.findOne({
        where: { id: id },
        include: [{ model: ItemSales, as: 'itens' }]
       
    });
}

//Pesquisar reprocessamento por id
export async function findByIdReprocessing(id) {
    return await Reprocessing.findOne({
        where: { id: id },
        include: [{ model: ItemReprocessing, as: 'itens' }]
    });
}

//Pesquisa pelo nome
export async function findBySalesName(nomeCliente) {
    return await Sale.findOne({
        where: { nome: nomeCliente },
        attributes: ['id'] 
    });
}

//Pesquisar venda por dados correspondentes
export async function findSaleIdByMatch(dados) {
    const sales = await Sale.findAll({
        where: {
            nome: dados.nomeCliente,
            cpf: dados.cpf,
            email: dados.email,
            quantidade: dados.quantidade,
            valorVenda: dados.valorVenda,
            valorRecebido: dados.valorRecebido,
            troco: dados.troco
        },
        attributes: ['id'],
        order: [['id', 'DESC']] 
    });

    return sales; 
}

//criar um novo reprocessamento
export async function createReprocessing(dados) {
    return await Reprocessing.create(dados,{
         include: [{ model: ItemReprocessing, as: 'itens' }]
    });
}

//Criar uma nova venda
export async function createSales(dados) {
    return await Sale.create(dados,{
         include: [{ model: ItemSales, as: 'itens' }]
    });
}


export async function updateReprocessing(id, status) {
    return await Reprocessing.update({ reprocessado: status }, {
        where: { id: id }
    });
}
