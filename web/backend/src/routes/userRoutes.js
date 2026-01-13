import { Router } from 'express';
import{insertUsersControler, loginUsersControler, deletUsersControler, updateUsersControler, findAllUsersControler } from '../controllers/userController.js'

const router = Router();

router.post('/login', loginUsersControler)
router.get('/users', findAllUsersControler)
router.post('/cadastro', insertUsersControler)
router.delete('/delet', deletUsersControler)
router.put('/update', updateUsersControler)

export default router;