import express from 'express';
import { body } from 'express-validator';
import { admin, create, save, addImage } from '../controllers/propertyController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/my-properties', protectRoute, admin);
router.get('/properties/create', protectRoute, create);
router.post('/properties/create', protectRoute,
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('The description cannot be empty!').
    isLength({ max: 50 }).withMessage('The description is very long!'),
    body('category').isNumeric().withMessage('Select one category, please'),
    body('price').isNumeric().withMessage('Select one price range, please'),
    body('rooms').isNumeric().withMessage('Insert minimun 1 room, please'),
    body('parking').isNumeric().withMessage('Insert minimun 1 parking, please'),
    body('wc').isNumeric().withMessage('Insert minimun 1 wc, please'),
    body('lat').notEmpty().withMessage('Plase, locate the property in the map'),
    save);
router.get('/properties/add-image/:id', addImage)

export default router;