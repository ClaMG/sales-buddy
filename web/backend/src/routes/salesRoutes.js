import { Router } from 'express';
import {findAllSale, CreateController} from '../controllers/salesController.js'

const router = Router();

router.get('/sales', findAllSale)
router.post('/create', CreateController)//temporario
export default router;