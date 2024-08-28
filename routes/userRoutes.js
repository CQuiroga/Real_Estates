import express from 'express';
import { formLogin, 
         formRegister, 
         register, 
         formForgotPassword,
         confirm
       } from '../controllers/userController.js'; 

const router = express.Router();

router.get('/login', formLogin);
router.get('/register', formRegister);
router.post('/register', register);
router.get('/forgot-password', formForgotPassword);
router.get('/confirm/:token', confirm);

export default router;