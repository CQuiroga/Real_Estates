import Property from './Property.js';
import Price from './Price.js';
import Category from './Category.js';
import User from './User.js';
import Message from './Message.js';

Property.belongsTo(Price, { foreignKey: 'priceId'});
Property.belongsTo(Category, { foreignKey: 'categoryId'});
Property.belongsTo(User, { foreignKey: 'userId'});
Property.hasMany(Message, { foreignKey: 'propertyId'} )

Message.belongsTo(Property, { foreignKey: 'propertyId'});
Message.belongsTo(User, { foreignKey: 'userId'});

export {
    Property,
    Price,
    Category,
    User,
    Message
}