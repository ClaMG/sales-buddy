import { Router } from 'express';
import{insertUsersControler, loginUsersControler, deletUsersControler, updateUsersControler, findAllUsersControler, updatePasswordControler, insertCodeTempControler, updateCodeTempControler  } from '../controllers/userController.js'
import {authMiddleware} from '../middlewares/authMiddlewares.js'

const router = Router();

router.post('/login', loginUsersControler)
router.get('/users', authMiddleware, findAllUsersControler) 
router.post('/cadastro', insertUsersControler) 
router.post('/codigotemp', insertCodeTempControler) 
router.delete('/delet', authMiddleware, deletUsersControler)
router.put('/update/:id', authMiddleware, updateUsersControler)
router.put('/updatePassword', authMiddleware, updatePasswordControler)
router.put('/updatePasswordCodeTemp', updateCodeTempControler) 

export default router;

