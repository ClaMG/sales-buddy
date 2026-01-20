import {findAllSales} from '../dao/salesDAO.js'
import {saleById, createSales} from '../services/salesServices.js'


export async function findAllSale(req, res) {
    try {
        const resultado = await findAllSales();
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function Comprovante(req, res) {
const { id } = req.body; 
        try{
            const resultado = await saleById(id )
            return res.status(200).json(resultado);
        }catch(error){
            return res.status(400).json({ message: error.message });
        }
}

export async function CreateController(req, res) {
   const novaVenda = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            // Conversão de tipos para segurança do banco
            quantidade: parseInt(req.body.quantidade) || 0,
            valor_venda: parseFloat(req.body.valor_venda) || 0,
            valor_recebido: parseFloat(req.body.valor_recebido) || 0,
            troco: parseFloat(req.body.troco) || 0,
            itens: req.body.itens || [] // Garante que seja ao menos um array vazio
        };
    try {
        const resultado = await createSales(novaVenda);
        return res.status(201).json(resultado);
    } catch (error) {
            return res.status(400).json({ message: error.message });

    }
}
