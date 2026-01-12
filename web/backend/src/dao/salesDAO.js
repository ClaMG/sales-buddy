import { Sale } from "../models/salesModels";

//Buscar todas as vendas
export async function findAllSales() {
    return await Sale.findAll();
}