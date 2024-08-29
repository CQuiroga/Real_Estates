import { check, validationResult} from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { genId } from '../helpers/tokens.js';
import { registerEmail, forgotPassordrEmail } from '../helpers/emails.js';

const formLogin = (req, res) => {
    res.render('auth/login', {
        page: 'Login'
    });
}

const formRegister = (req, res) => {
    res.render('auth/register', {
        page: 'Create Account',
        csrfToken: req.csrfToken()
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
        csrfToken: req.csrfToken(),
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
            csrfToken: req.csrfToken(),
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
            
            // Confirm account
            user.token = null;
            user.confirmed = true;
            await user.save();

            return res.render('auth/confirm-account', {
                page: 'Success',
                message: 'Your account has been confirmed successfully',
                error: false
            });
        }


};

const formForgotPassword = (req, res) => {
    res.render('auth/forgot-password', {
        page: 'Recover Password',
        csrfToken: req.csrfToken(),
    });
}

const resetPassword = async (req, res) => {
    //validations
    await check('email').isEmail().withMessage('Please enter a valid email').run(req);
    
    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.render('auth/forgot-password', {
            page: 'Recover Password',
            csrfToken: req.csrfToken(),
            errors: result.array()
        });
    } 
    // Find user
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }
    const user = await User.findOne({ where: { email }});
    if (!user) {
        return res.render('auth/forgot-password', {
            page: 'Recover Password',
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'User not found!' }],
        });
    } 

    // Generate a new token & send email
    user.token = genId();
    await user.save();

    forgotPassordrEmail({
        name: user.name,
        email: user.email,
        token: user.token
    });

    // Reset confirmation Message
    res.render('templates/message', { 
        page: 'Reset your password',
        message: 'We have sent a reset email, please click on the link in the email to reset your password'
    });
}

const verifyToken = async (req, res) => {
    
    const {token} = req.params;
    const user = await User.findOne({ where: { token }});
    if (!user) {
        return res.render('auth/confirm-account', {
            page: 'Reset Passwword',
            message: 'There was an error validating your information. Please try again.',
            error: true
        });
    }

    res.render('auth/reset-password', {
        page: 'Reset Your Password',
        csrfToken: req.csrfToken()
    });
    
};

const newPassword = async (req, res) => {
    // Password validation
    await check('password').isLength({ min: 6 }).withMessage('The password field must contain at least 6 characters').run(req);

    let result = validationResult(req);

    if (!result.isEmpty()) {
        return res.render('auth/reset-password', {
            page: 'Reset Your Password',
        errors: result.array(),
        csrfToken: req.csrfToken()
        });
    } 

    const { token } = req.params
    const { password } = req.body

    // User validation

    const user = await User.findOne({ where: { token }});

    // Hash for the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.token = null;

    await user.save();

    res.render('auth/confirm-account', { 
        page: 'password reset',
        message: 'Your password has been reset successfully'
    });
    
};


export {
    formLogin,
    formRegister,
    register,
    formForgotPassword,
    confirm,
    resetPassword,
    verifyToken,
    newPassword,
}