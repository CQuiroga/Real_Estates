import jwt from 'jsonwebtoken';
import { User }  from '../models/index.js';

const protectRoute = async(req, res, next) => {
    
    // is there a token?
    const { _token } = req.cookies;

    if (!_token) {
        return res.redirect('/auth/login');
    }

    // check token
    try {
        const decoded = jwt.verify( _token, process.env.JWT_SECRET);
        const user = await User.scope('deletePassword').findByPk(decoded.id);

        // Fill 'req' whith user
        if (user) {
            req.user = user;
        }
        else {
            return res.clearCookie('_token').redirect('/auth/login');
        }
        return next();
    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login');
    }
}

export default protectRoute;
