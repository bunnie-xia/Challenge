const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const ProductOrder = require('./productorder')

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
