import express from 'express';
import { formLogin, 
         formRegister, 
         register, 
         formForgotPassword 
       } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/login', formLogin);
router.get('/register', formRegister);
router.post('/register', register);
router.get('/forgot-password', formForgotPassword);


export default router;