import { check, validationResult} from 'express-validator';
import User from '../models/User.js';
import { genId } from '../helpers/tokens.js';
import { registerEmail } from '../helpers/emails.js';

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
    const userExist = await User.findOne({ where: { email: email } });
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

    // Save User
    const user = await User.create({
        name,
        email,
        password,
        token: genId()
    });

    // Send confirmation email
    registerEmail({
        name: user.name,
        email: user.email,
        token: user.token
    })

    // Confirmation Message
    res.render('templates/message', { 
        page: 'Account Created Successfully',
        message: 'We have sent a confirmation email, please click on the link in the email to activate your account'
    });
}

// confirm account function
const confirm = async (req, res) => {

    const { token} = req.params;
    
    // Token is valid?

    const user = await User.findOne({ where: {token}});

    if (!user) {
        return res.render('auth/confirm-account', {
            page: 'Error',
            message: 'Invalid token. Please try again.',
            error: true
        });
    }
    else{
        return res.render('auth/confirm-account', {
            page: 'Success',
            message: 'Your account has been confirmed successfully',
            error: false
        });
    }

    // Confirm account
};

const formForgotPassword = (req, res) => {
    res.render('auth/forgot-password', {
        page: 'Recover Password'
    });
}

export {
    formLogin,
    formRegister,
    register,
    formForgotPassword,
    confirm
}