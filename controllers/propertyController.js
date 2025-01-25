import { validationResult } from 'express-validator';
import Price from '../models/Price.js';
import Category from '../models/Category.js';


const admin = (req, res) => {
    res.render('properties/admin', {
        page: 'My properties',
        header: true
    });
}

// Create property form
const create = async(req, res) => {

    // Find Price & Category
    const [ categories, prices ] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]);

    res.render('properties/create', {
        page: 'Create property',
        header: true,
        csrfToken: req.csrfToken(),
        categories,
        prices
    });
}

const save = async(req, res) => {
    
    // Validations
    let result = validationResult(req);

    if (!result.isEmpty()) {
        const [ categories, prices ] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ]);

        return res.render('properties/create', {
            page: 'Create property',
            header: true,
            categories,
            prices,
            csrfToken: req.csrfToken(),
            errors: result.array()
        });
    } 
}

export {
    admin,
    create,
    save
}