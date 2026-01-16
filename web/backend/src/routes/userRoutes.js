import { Router } from 'express';
import{insertUsersControler, loginUsersControler, deletUsersControler, updateUsersControler, findAllUsersControler, updateSenhaControler, insertCodeTempControler  } from '../controllers/userController.js'
//import {authMiddleware} from '../middlewares/authMiddlewares.js'

const router = Router();

router.post('/login', loginUsersControler)
router.get('/users', findAllUsersControler)
router.post('/cadastro', insertUsersControler)
router.post('/codigotemp', insertCodeTempControler)
router.delete('/delet', deletUsersControler)
router.put('/update', updateUsersControler)
router.put('/senha', updateSenhaControler)

export default router;