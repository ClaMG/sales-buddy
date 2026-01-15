import { Router } from 'express';
import {findAllSale, CreateController, Comprovante} from '../controllers/salesController.js'

const router = Router();

router.get('/sales', findAllSale)
router.post('/comprovante', Comprovante)
router.post('/create', CreateController)//temporario
export default router;