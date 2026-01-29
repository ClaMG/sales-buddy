import {findAllSales, findAllReprocessing} from '../dao/salesDAO.js'
import {saleById, createSalesService, enviarComprovantePagamento, enviarComprovanteMobile, createReprocessingService, reprocessingService} from '../services/salesServices.js'
import {saleReprocessingByIdDTO,saleComprovanteDTO, saleCreateDTO, saleEnviarComprovanteDTO, saleEnviarComprovanteMobileDTO,saleCreateReprocessingDTO} from '../DTO/salesDTO.js'

export async function findAllSaleController(req, res) {
    try {
        const resultado = await findAllSales();
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function Comprovante(req, res) {
    const id = saleComprovanteDTO(req.body); 
    try{
        const resultado = await saleById(id )
        return res.status(200).json(resultado);
    }catch(error){
        return res.status(400).json({ message: error.message });
    }
}

export async function CreateController(req, res) {
   const novaVenda = saleCreateDTO(req.body)
    try {
        const resultado = await createSalesService(novaVenda);
        return res.status(201).json(resultado);
    } catch (error) {
    console.log(error); 
    return res.status(400).json({ 
            message: error.message,
            details: error.errors ? error.errors.map(e => e.message) : [] 
        });
    }
}

export async function EnviarComprovanteController(req, res) {
    const comprovante = saleEnviarComprovanteDTO(req.body);
    try {
        await enviarComprovantePagamento(comprovante);
        return res.status(200).json({ message: "E-mail enviado com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }   
}

export async function enviarComprovanteMobileController(req, res) {
    const dados = saleEnviarComprovanteMobileDTO(req.body)
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
   const novoReprocessamento = saleCreateReprocessingDTO(req.body)
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
    const dados = saleReprocessingByIdDTO(req.body);
   try {
        const resultado = await reprocessingService(dados);
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
