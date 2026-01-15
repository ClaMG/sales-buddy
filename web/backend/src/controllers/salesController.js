import {findAllSales, createSales} from '../dao/salesDAO.js'


export async function findAllSale(req, res) {
    try {
        const resultado = await findAllSales();
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
//temporario

export async function CreateController(req, res) {
   const novaVenda = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            // Conversão de tipos para segurança do banco
            quantidade: parseInt(req.body.quantidade) || 0,
            valor: parseFloat(req.body.valor) || 0,
            troco: parseFloat(req.body.troco) || 0,
            itens: req.body.itens || [] // Garante que seja ao menos um array vazio
        };
    try {
        const resultado = await createSales(novaVenda);
        return res.status(201).json(resultado);
    } catch (error) {
       if (error.errors) {
        console.log("DETALHES DO ERRO:", error.errors.map(e => e.message));
    }
    return res.status(400).json({ 
        message: error.message,
        details: error.errors ? error.errors.map(e => e.message) : error
    });
    }
}