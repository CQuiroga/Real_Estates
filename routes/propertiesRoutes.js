import express from 'express';
import { body } from 'express-validator';
import { admin, create, save } from '../controllers/propertyController.js';

const router = express.Router();

router.get('/my-properties', admin);
router.get('/my-properties/create', create);
router.post('/my-properties/create', 
    body('title').notEmpty().withMessage('Title is required'),
    save);


export default router;