import bcrypt from 'bcrypt';

const users = [
    {
        name: 'John Doe',
        email: 'mail@mail.com',
        confirmed: 1,
        password: bcrypt.hashSync('123456', 10)
    }
];

export default users;