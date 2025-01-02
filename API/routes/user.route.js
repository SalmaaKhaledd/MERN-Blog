import express from 'express';
import {test, updateUser, deleteUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { signout } from '../controllers/user.controller.js';


const router = express.Router();

router.get('/test', test);
//first verify token then if token verified, user is added to request object and updateUser is called
router.put('/update/:userId',verifyToken, updateUser);
router.delete('/delete/:userId',verifyToken, deleteUser);
router.post('/signout', signout);

export default router;