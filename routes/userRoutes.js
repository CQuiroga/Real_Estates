import express from 'express';
import { formLogin,
         auth,
         formRegister, 
         register, 
         formForgotPassword,
         confirm,
         resetPassword,
         verifyToken,
         newPassword
       } from '../controllers/userController.js'; 

const router = express.Router();

router.get('/login', formLogin);
router.post('/login', auth);

router.get('/register', formRegister);
router.post('/register', register);

router.get('/forgot-password', formForgotPassword);
router.post('/forgot-password', resetPassword);

router.get('/confirm/:token', confirm);

router.get('/forgot-password/:token', verifyToken);
router.post('/forgot-password/:token', newPassword);

export default router;