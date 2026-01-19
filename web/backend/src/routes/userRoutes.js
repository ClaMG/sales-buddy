import { Router } from 'express';
import{insertUsersControler, loginUsersControler, deletUsersControler, updateUsersControler, findAllUsersControler, updateSenhaControler, insertCodeTempControler, updateCodeTempControler  } from '../controllers/userController.js'
import {authMiddleware} from '../middlewares/authMiddlewares.js'

const router = Router();

router.post('/login', loginUsersControler)
router.get('/users', authMiddleware, findAllUsersControler)
router.post('/cadastro', authMiddleware, insertUsersControler)
router.post('/codigotemp', insertCodeTempControler)
router.delete('/delet', authMiddleware, deletUsersControler)
router.put('/update', authMiddleware, updateUsersControler)
router.put('/updatePassword', updateSenhaControler)
router.put('/updatePasswordCodeTemp', updateCodeTempControler)

export default router;

