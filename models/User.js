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
    }
   });

// Custom methods
User.prototype.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

/* User.prototype.generateToken = async function() {
    const token = await bcrypt.hash(this.email, 10);
    this.token = token;
    await this.save();
    return token;
}; */

export default User;