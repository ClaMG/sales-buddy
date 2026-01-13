import { Sale } from "../models/salesModels.js";

//Buscar todas as vendas
export async function findAllSales() {
    return await Sale.findAll();
}