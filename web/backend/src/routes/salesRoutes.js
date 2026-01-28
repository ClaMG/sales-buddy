import { Router } from 'express';
import {findAllSaleController, CreateController, Comprovante,EnviarComprovanteController, enviarComprovanteMobileController, CreateReprocessingController,ReprocessingByIdController,findAllReprocessingController} from '../controllers/salesController.js'

const router = Router();

router.get('/sales', findAllSaleController)
router.post('/comprovante', Comprovante)
router.post('/comprovante_mobile', enviarComprovanteMobileController)
router.post('/create', CreateController)
router.post('/enviar_comprovante', EnviarComprovanteController)
router.post('/create_reprocessing', CreateReprocessingController)
router.get('/reprocessings', findAllReprocessingController)
//testar
router.get('/reprocessing', ReprocessingByIdController)
export default router;