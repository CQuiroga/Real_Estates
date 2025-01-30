import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN
}, {
    hooks: {
        beforeCreate: async function(user) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    },
    scopes: {
        deletePassword: {
            attributes: { 
                exclude: ['password', 'token', 'confirmed', 'createdAt', 'updatedAt'] 
            }
        }
    }
   });

// Custom methods
User.prototype.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
export default User;