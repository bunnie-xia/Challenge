const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const ProductOrder = require('./productorder')

/*
 * Schema:
    - product belongs to many order
    - order belongs to many product

    - user has many order
    - order belongs to many user
 */
Product.belongsToMany(Order, {through: 'productOrder'})
Order.belongsToMany(Product, {through: 'productOrder'})

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Order,
  Product,
  ProductOrder
}
