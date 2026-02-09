import {findAllSales, findAllReprocessing} from '../dao/salesDAO.js'
import {saleById, createSalesService, sendProofPayment, sendProofMobile, createReprocessingService, reprocessingService} from '../services/salesServices.js'
import {saleReprocessingByIdDTO,saleProofDTO, saleCreateDTO, saleSendProofDTO, saleSendProofMobileDTO,saleCreateReprocessingDTO} from '../DTO/salesDTO.js'

export async function findAllSaleController(req, res) {
    try {
        const resultado = await findAllSales();
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function Proof(req, res) {
    try{
        const id = saleProofDTO(req.body); 
        const resultado = await saleById(id )
        return res.status(200).json(resultado);
    }catch(error){
        return res.status(400).json({ message: error.message });
    }
}

export async function CreateController(req, res) {
    try {
        const novaVenda = saleCreateDTO(req.body)
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

export async function SendProofController(req, res) {
    try {
        const comprovante = saleSendProofDTO(req.body);
        await sendProofPayment(comprovante);
        return res.status(200).json({ message: "E-mail enviado com sucesso." });
    } catch (error) {
    if (error.code === 'EAUTH') {
        console.error("Erro de Autenticação de E-mail: Verifique usuário e senha.");
    } else if (error.code === 'ESOCKET') {
        console.error("Erro de Conexão: Verifique se o host do e-mail está correto.");
    }
    
    return res.status(500).json({ 
        message: "Erro interno no servidor",
        debug_message: error.message,  // O erro real (ex: "Authentication failed")
        debug_stack: error.stack,      // A linha exata do código onde quebrou
        debug_details: error           // O objeto completo
    });
}  
}

export async function SendProofMobileController(req, res) {
    try {
        const dados = saleSendProofMobileDTO(req.body)
        const resultado = await sendProofMobile(dados);
        
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
    try {
        const novoReprocessamento = saleCreateReprocessingDTO(req.body)
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
    try {
       const dados = saleReprocessingByIdDTO(req.body);
        const resultado = await reprocessingService(dados);
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
