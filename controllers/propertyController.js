const admin = (req, res) => {
    res.render('properties/admin', {
        page: 'My properties',
        header: true
    });
}

// Create property form
const create = (req, res) => {
    res.render('properties/create', {
        page: 'Create property',
        header: true
    });
}

export {
    admin,
    create
}