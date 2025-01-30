import { validationResult } from 'express-validator';
import { Category, Price, Property, User } from '../models/index.js';


const admin = (req, res) => {
    res.render('properties/admin', {
        page: 'My properties'
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
        csrfToken: req.csrfToken(),
        categories,
        prices,
        data: {}
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
            categories,
            prices,
            csrfToken: req.csrfToken(),
            errors: result.array(),
            data: req.body
        });
    } 

    // Create a new property

    const { title, description, rooms, parking, wc, street, lat, lng, price: priceId, category: categoryId} = req.body;
    
    const { id: userId } = req.user;
    
    try {
        const propertyDB = await Property.create({
            title,
            description,
            rooms,
            parking,
            wc,
            street,
            lat,
            lng,
            priceId,
            categoryId,
            userId,
            image: ''
        });

        const { id } = propertyDB;
        
        res.redirect(`/properties/add-image/${id}`);

    } catch (error) {
        console.error('Error in save property -->', error.message);
    }
}

const addImage = async ( req, res) => {
    res.render('properties/add-image', {
        page: 'Add Images'
    });
}

export {
    admin,
    create,
    save,
    addImage
}