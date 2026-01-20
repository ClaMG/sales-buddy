import { Router } from 'express';
import {findAllSaleController, CreateController, Comprovante} from '../controllers/salesController.js'

const router = Router();

router.get('/sales', findAllSaleController)
router.post('/comprovante', Comprovante)
router.post('/create', CreateController)
export default router;