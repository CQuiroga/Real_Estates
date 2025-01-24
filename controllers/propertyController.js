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
    ])

    res.render('properties/create', {
        page: 'Create property',
        header: true,
        categories,
        prices
    });
}

export {
    admin,
    create
}