import Usuario from '../'

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

const register = (req, res) => {
    console.log(req.body);
    
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