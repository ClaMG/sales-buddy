import { Router } from 'express';
import{insertUsersControler, loginUsersControler, deletUsersControler, updateUsersControler, findAllUsersControler } from '../controllers/userController.js'
//import{CreateController } from '../controllers/salesController.js'

const router = Router();

router.post('/login', loginUsersControler)
router.get('/users', findAllUsersControler)
router.post('/cadastro', insertUsersControler)
router.delete('/delet', deletUsersControler)
router.put('/update', updateUsersControler)
//router.post('/test', CreateController)

export default router;