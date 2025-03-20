import express from 'express';
import { home, category, notFound, search } from '../controllers/appController.js'


const router = express.Router();

// Home page
router.get('/', home);

// Categories page

router.get('/categories/:id', category);

// 404 page

router.get('/404', notFound);

// Search page

router.post('/search', search);

export default router;