import express from 'express';
import { body } from 'express-validator';
import { admin, 
    create, save, addImage, 
    storageImage, edit, saveEdit, 
    deleteProperty, changeState,
    showProperty, sendMessage, seeMessages,  } from '../controllers/propertyController.js';
import protectRoute from '../middleware/protectRoute.js';
import upload from '../middleware/uploadImages.js';
import identifyUser from '../middleware/identifyUser.js';

const router = express.Router();

router.get('/my-properties', protectRoute, admin);

router.get('/properties/create', protectRoute, create);

router.post('/properties/create', protectRoute,
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('The description cannot be empty!').
    isLength({ max: 2000 }).withMessage('The description is very long!'),
    body('category').isNumeric().withMessage('Select one category, please'),
    body('price').isNumeric().withMessage('Select one price range, please'),
    body('rooms').isNumeric().withMessage('Insert minimun 1 room, please'),
    body('parking').isNumeric().withMessage('Insert minimun 1 parking, please'),
    body('wc').isNumeric().withMessage('Insert minimun 1 wc, please'),
    body('lat').notEmpty().withMessage('Plase, locate the property in the map'),
    save
);

router.get('/properties/add-image/:id', addImage);

router.post('/properties/add-image/:id',
    protectRoute,
    upload.single('file'),
    storageImage
);

router.get('/properties/edit/:id', 
    protectRoute,
    edit
);

router.post('/properties/edit/:id', protectRoute,
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('The description cannot be empty!').
    isLength({ max: 50 }).withMessage('The description is very long!'),
    body('category').isNumeric().withMessage('Select one category, please'),
    body('price').isNumeric().withMessage('Select one price range, please'),
    body('rooms').isNumeric().withMessage('Insert minimun 1 room, please'),
    body('parking').isNumeric().withMessage('Insert minimun 1 parking, please'),
    body('wc').isNumeric().withMessage('Insert minimun 1 wc, please'),
    body('lat').notEmpty().withMessage('Plase, locate the property in the map'),
    saveEdit
);

router.post('/properties/delete/:id', 
    protectRoute,
    deleteProperty
);

// Change property status

router.put('/properties/:id',
    protectRoute,
    changeState
);




// Public zone

router.get('/property/:id', identifyUser, showProperty);

// Storage messages
router.post('/property/:id',
    identifyUser,
    body('message').isLength({min: 20}).withMessage('The message cannot be empty or is too short.'),
    sendMessage
)

router.get('/messages/:id', 
    protectRoute,
    seeMessages
)


export default router;