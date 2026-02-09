import { Router } from 'express';
import {findAllSaleController, CreateController, Proof, SendProofController, SendProofMobileController, CreateReprocessingController,ReprocessingByIdController,findAllReprocessingController} from '../controllers/salesController.js'

const router = Router();

router.get('/sales', findAllSaleController)
router.post('/comprovante', Proof)
router.post('/comprovante_mobile', SendProofMobileController)
router.post('/create', CreateController)
router.post('/enviar_comprovante', SendProofController)
router.post('/create_reprocessing', CreateReprocessingController)
router.get('/reprocessings', findAllReprocessingController)
router.post('/reprocessing', ReprocessingByIdController)//
export default router;