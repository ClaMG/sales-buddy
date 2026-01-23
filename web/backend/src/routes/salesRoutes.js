import { Router } from 'express';
import {findAllSaleController, CreateController, Comprovante,EnviarComprovanteController} from '../controllers/salesController.js'

const router = Router();

router.get('/sales', findAllSaleController)
router.post('/comprovante', Comprovante)
router.post('/create', CreateController)
router.post('/enviar_comprovante', EnviarComprovanteController)
export default router;