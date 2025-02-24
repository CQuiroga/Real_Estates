import Property from './Property.js';
import Price from './Price.js';
import Category from './Category.js';
import User from './User.js';

Property.belongsTo(Price, { foreignKey: 'priceId'});
Property.belongsTo(Category, { foreignKey: 'categoryId'});
Property.belongsTo(User, { foreignKey: 'userId'});

export {
    Property,
    Price,
    Category,
    User
}