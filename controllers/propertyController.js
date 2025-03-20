import { unlink } from 'node:fs/promises'
import { validationResult } from 'express-validator';
import { Category, Price, Property, User, Message } from '../models/index.js';
import { isSeller, formatDate } from '../helpers/index.js'; 

const admin = async(req, res) => {

    // Read Query String

    const { page:actualPage } = req.query;
    const expresion = /^[1-9]$/;
    if (!expresion.test(actualPage)) {
        return res.redirect('/my-properties?page=1');
    }

    try {
        const { id } = req.user;

        // Limits & offsets
        const limit = 10;
        const offset = (actualPage - 1) * limit;

        const [properties, total] = await Promise.all([
            Property.findAll( {
                limit,
                offset,
                where: { userId: id },
                include: [
                    { model: Category, as: 'category'},
                    { model: Price, as: 'price'},
                    { model: Message, as: 'messages'}
                ],               
            }),
            Property.count({
                where: { userId: id }
            })
        ]);
        res.render('properties/admin', {
            page: 'My properties',
            properties,
            csrfToken: req.csrfToken(),
            pages: Math.ceil(total/limit),
            actualPage: Number(actualPage),
            total,
            offset,
            limit
        });
    } catch (error) {
        console.log(error);
    }

    
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

    const { id } = req.params;

    // Property Exist?
    const property = await Property.findByPk(id);

    if (!property) {
        return res.redirect('/my-properties');
    }

    // Property is published?
    if (property.published) {
        return res.redirect('/my-properties');
    }

    // Does the property belong to the user who posts it?
    if ( req.user.id.toString() !== property.userId.toString() ) {
        return res.redirect('/my-properties');
    }

    res.render('properties/add-image', {
        page: 'Add Images for ',
        title: property.title,
        csrfToken: req.csrfToken(),
        property
    });
}

const storageImage = async (req, res, next) => {
    
    const { id } = req.params;

    // Property Exist?
    const property = await Property.findByPk(id);
    if (!property) {
        return res.redirect('/my-properties');
    }

    // Property is published?
    if (property.published) {
        return res.redirect('/my-properties');
    }

    // Does the property belong to the user who posts it?
    if ( req.user.id.toString() !== property.userId.toString() ) {
        return res.redirect('/my-properties');
    }

    try {

        // Storage image & publish property
        property.image = req.file.filename;
        property.published = true;
        await property.save();
        next();

    } catch (error) {
        console.error(error);
    }
}

const edit = async (req, res) => {

    const { id } = req.params;
    
    // Property Exist?
    const property = await Property.findByPk(id);

    if (!property) {
        return res.redirect('/my-properties');
    }
    
    // Is property user author?
    if ( property.userId.toString()!== req.user.id.toString() ) {
        return res.redirect('/my-properties');
    }

    // Find Price & Category
    const [ categories, prices ] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]);

    res.render('properties/edit', {
        page: 'Edit property: ',
        title: property.title,
        csrfToken: req.csrfToken(),
        categories,
        prices,
        data: property
    });
}

const saveEdit = async (req, res) => {
    
    // Validations
    let result = validationResult(req);

    if (!result.isEmpty()) {
        const [ categories, prices ] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ]);

        return res.render('properties/edit', {
            page: 'Edit property',
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errors: result.array(),
            data: req.body
        });
    } 

    const { id } = req.params;
    
    // Property Exist?
    const property = await Property.findByPk(id);

    if (!property) {
        return res.redirect('/my-properties');
    }
    
    // Is property user author?
    if ( property.userId.toString()!== req.user.id.toString() ) {
        return res.redirect('/my-properties');
    }

    // Update property

    try {
        const { title, description, rooms, parking, wc, street, lat, lng, price: priceId, category: categoryId} = req.body;
        property.set({
            title,
            description,
            rooms,
            parking,
            wc,
            street,
            lat,
            lng,
            priceId,
            categoryId
        });

        await property.save();
        res.redirect('/my-properties');

    } catch (error) {
        console.log(error);
        
    }

}

const deleteProperty = async (req, res) => {
    
    const { id } = req.params;

    // Property Exist?
    const property = await Property.findByPk(id);

    if (!property) {
        return res.redirect('/my-properties');
    }
    
    // Is property user author?
    if ( property.userId.toString()!== req.user.id.toString() ) {
        return res.redirect('/my-properties');
    }
    
    // Delete image file
    await unlink(`public/uploads/${property.image}`);
    
    // Delete property
    try {
        await property.destroy();
        res.redirect('/my-properties');
    }
    catch (error) {
        console.error(error);
    }
}

// Change property state

const changeState = async (req, res) => {

    const {id} = req.params

    // Property Exist?
    const property = await Property.findByPk(id);

    if (!property) {
        return res.redirect('/my-properties');
    }
    
    // Is property user author?
    if ( property.userId.toString()!== req.user.id.toString() ) {
        return res.redirect('/my-properties');
    }

    // Update property status
    property.published = !property.published

    await property.save();

    res.json({
        result: true
    })
}

// Show one property

const showProperty = async (req, res) => {

    const { id } = req.params;

    // Property Exist?
    const property = await Property.findByPk(id, {
        include: [
            { model: Category, as: 'category', scope: 'deletePassword'},
            { model: Price, as: 'price'}
        ]
    });

    if ( !property || !property.published ) {
        return res.redirect('/404');
    }

    res.render('properties/show', {
        page: property.title,
        property,
        csrfToken: req.csrfToken(),
        user: req.user,
        isSeller: isSeller(req.user?.id, property.userId )
    });
}

const sendMessage = async (req, res) => {
    const {id} = req.params

    // Property Exist?
    const property = await Property.findByPk(id, {
        include : [
            { model: Price, as: 'price' },
            { model: Category, as: 'category' },
        ]
    })

    if(!property) {
        return res.redirect('/404')
    }

    // Render errors
    // Validation
    let result = validationResult(req);

    if(!result.isEmpty()) {
        return res.render('properties/show', {
            page: property.title,
            property,
            csrfToken: req.csrfToken(),
            user: req.user,
            isSeller: isSeller(req.user?.id, property.userId ),
            errors: result.array()
        });
    }

    const { message } = req.body;
    const { id: propertyId } = req.params;
    const { id: userId } = req.user;

    // Almacenar el mensaje
    await Message.create({
        message,
        propertyId,
        userId
    });
    res.redirect('/');
}

// Read inbox messages

const seeMessages = async (req, res) => {

    const { id } = req.params

    // Property exists?
    const property = await Property.findByPk(id, {
        include: [
            { model: Message, as: 'messages', 
                include: [
                    { model: User.scope('deletePassword'), as: 'user' }
                ]
            },
        ],
    })

    if(!property) {
        return res.redirect('/my-properties')
    }

    if(property.userId.toString() !== req.user.id.toString() ) {
        return res.redirect('/my-properties')
    }

    res.render('properties/messages', {
        page: 'Messages',
        messages: property.messages,
        formatDate
    }) 
}

export {
    admin,
    create,
    save,
    addImage,
    storageImage,
    edit,
    saveEdit,
    deleteProperty,
    changeState,
    showProperty,
    sendMessage,
    seeMessages
}