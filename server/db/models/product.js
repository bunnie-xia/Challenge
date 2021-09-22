const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('Product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  pieceCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  dimensions: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://atzcart.s3.ap-south-1.amazonaws.com/uploads/images/categories/default.png'
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
})

Product.beforeSave(Product => {
  if (Product.pieceCount === 0) {
    Product.imageUrl =
      'https://media.istockphoto.com/vectors/sold-out-stamp-sold-out-square-grunge-sign-sold-out-vector-id1172420644'
  }
})

module.exports = Product
