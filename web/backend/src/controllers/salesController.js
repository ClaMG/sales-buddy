import {findAllSales} from '../dao/salesDAO.js'
import {saleById, createSalesService, enviarComprovantePagamento} from '../services/salesServices.js'


export async function findAllSaleController(req, res) {
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
            nomeCliente: req.body.nomeCliente,
            cpf: req.body.cpf,
            email: req.body.email,
            itens: req.body.itens || [] ,
            valorRecebido: parseFloat(req.body.valorRecebido) || 0,
            valorVenda: parseFloat(req.body.valorVenda) || 0,
            troco: parseFloat(req.body.troco) || 0
        };
    try {
        const resultado = await createSalesService(novaVenda);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

export async function EnviarComprovanteController(req, res) {
    const comprovante ={
        nomeCliente: req.body.nomeCliente,
        cpf: req.body.cpf,
        email: req.body.email,
        itens: req.body.itens || [],
        valorRecebido: parseFloat(req.body.valorRecebido) || 0,
        valorVenda: parseFloat(req.body.valorVenda) || 0,
        troco: parseFloat(req.body.troco) || 0
    }
    try {
        await enviarComprovantePagamento(comprovante);
        return res.status(200).json({ message: "E-mail enviado com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }   
}