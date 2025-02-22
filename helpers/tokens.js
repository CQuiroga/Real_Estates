import jwt from 'jsonwebtoken';

const genId = () => Math.random().toString(32).substring(2);

    // JWT

    const generateJWT = id => jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        })

export {
    genId,
    generateJWT,
}