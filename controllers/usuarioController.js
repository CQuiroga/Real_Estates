import { check, validationResult} from 'express-validator';
import Usuario from '../models/Usuario.js';

const formLogin = (req, res) => {
    res.render('auth/login', {
        page: 'Login'
    });
}

const formRegister = (req, res) => {
    res.render('auth/register', {
        page: 'Create Account'
    });
}

const register = async(req, res) => {

    const { name, email, password } = req.body;
    
    //validations
    await check('name').notEmpty().withMessage('Name field cannot be empty').run(req);
    await check('email').isEmail().withMessage('Please enter a valid email').run(req);
    await check('password').isLength({ min: 6 }).withMessage('The password field must contain at least 6 characters').run(req);
    await check('repeat_password').equals(password).withMessage('The passwords must be equals').run(req);
    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.render('auth/register', {
        page: 'Create Account',
        errors: result.array(),
        user : {
            name: name,
            email: email
        }
        });
    } 
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    // Checking  duplicate users
    const userExist = await Usuario.findOne({ where: { email: email } });
    if (userExist) {
        return res.render('auth/register', {
            page: 'Create Account',
            errors: [{ msg: 'Duplicate user' }],
            user : {
                name: name,
                email: email
            }
            });
    }
    
    // Encrypt password
    //req.body.password = await bcrypt.hash(req.body.password, 10);

    // Save User
    const usuario = await Usuario.create({
        name,
        email,
        password,
        token: 123456
    });
    res.json(usuario);
}

const formForgotPassword = (req, res) => {
    res.render('auth/forgot-password', {
        page: 'Recover Password'
    });
}

export {
    formLogin,
    formRegister,
    register,
    formForgotPassword
}