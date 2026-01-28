import {findAllSales, findAllReprocessing} from '../dao/salesDAO.js'
import {saleById, createSalesService, enviarComprovantePagamento, enviarComprovanteMobile, createReprocessingService, reprocessingService} from '../services/salesServices.js'


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

export async function enviarComprovanteMobileController(req, res) {
    const dados ={
        nomeCliente: req.body.nomeCliente,
        cpf: req.body.cpf,
        email: req.body.email,
        itens: req.body.itens || [],
        valorRecebido: parseFloat(req.body.valorRecebido) || 0,
        valorVenda: parseFloat(req.body.valorVenda) || 0,
        troco: parseFloat(req.body.troco) || 0
    }
    try {
        const resultado = await enviarComprovanteMobile(dados);
        
        return res.status(200).json({
            id: resultado, 
            message: "Comprovante processado com sucesso."
        });
    } catch (error) {
        console.error("Erro no Controller Mobile:", error.message);
        
        return res.status(400).json({
            message: error.message || "Erro ao processar comprovante."
        });
    }
    
}

export async function CreateReprocessingController(req, res) {
   const novoReprocessamento = {
            nomeCliente: req.body.nomeCliente,
            cpf: req.body.cpf,
            email: req.body.email,
            itens: req.body.itens || [] ,
            valorRecebido: parseFloat(req.body.valorRecebido) || 0,
            valorVenda: parseFloat(req.body.valorVenda) || 0,
            troco: parseFloat(req.body.troco) || 0
        };
    try {
        const resultado = await createReprocessingService(novoReprocessamento);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function findAllReprocessingController(req, res) {
    try {
        const resultado = await findAllReprocessing();
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function ReprocessingByIdController(req, res) {
    const dados = { id: req.body.id };
   try {
        const resultado = await reprocessingService(dados);
        return res.status(200).json(resultado);
    } catch (error) {
        // Verifica se é um erro de validação do Sequelize
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            // Mapeia todas as mensagens de erro detalhadas
            const mensagensDetalhadas = error.errors.map(err => err.message).join(", ");
            return res.status(400).json({ 
                message: `Erro de Validação: ${mensagensDetalhadas}`,
                errorType: error.name 
            });
        }

        // Erro genérico ou do Service
        return res.status(400).json({ message: error.message });
    }
}
