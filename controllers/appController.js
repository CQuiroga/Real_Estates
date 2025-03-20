import { Sequelize } from 'sequelize';
import { Category, Price, Property } from '../models/index.js';

const home = async (req, res) => {

    const [ categories, prices, houses, apartments] = await Promise.all([
        Category.findAll({raw: true}),
        Price.findAll({raw: true}),
        Property.findAll({
            limit: 3,
            where: { 
                categoryId: 1
            },
            include: [
                {
                    model: Price, 
                    as: 'price',
                }
            ], 
            order: [
                ['createdAt', 'DESC']
            ]
        }),
        Property.findAll({
            limit: 3,
            where: { 
                categoryId: 2
            },
            include: [
                {
                    model: Price, 
                    as: 'price',
                }
            ], 
            order: [
                ['createdAt', 'DESC']
            ]
        })
    ]);

    res.render('home', {
        page: 'Home',
        categories,
        prices,
        houses,
        apartments,
        csrfToken: req.csrfToken()
    });
};

const category = async (req, res) => {

    const { id } = req.params;

    // Category exists?

    const category = await Category.findByPk(id);

    if (!category) {
        return res.redirect('/404');
    }

    // Get properties by category
    const properties = await Property.findAll({
        where: {
            categoryId: id
        },
        include: [
            {
                model: Price,
                as: 'price',
            }
        ],
        order: [
            ['createdAt', 'DESC']
        ]
    });

    res.render('category', {
        page: category.name,
        properties,
        csrfToken: req.csrfToken()
    });


};

const notFound = (req, res) => {
    res.render('404', {
        page: 'Not Found',
        csrfToken: req.csrfToken()
    })
};

const search = async (req, res) => {
    const { word } = req.body

    // Word is null?
    if(!word.trim()) {
        return res.redirect('back')
    }

    // Search properties
    const properties = await Property.findAll({
        where: {
            title: {
                [Sequelize.Op.like] : '%' + word + '%'
            }
        },
        include: [
            { model: Price, as: 'price'}
        ]
    })

    res.render('search', {
        page: 'Search Results',
        properties, 
        csrfToken: req.csrfToken()
    })
};

export { home, category, notFound, search }