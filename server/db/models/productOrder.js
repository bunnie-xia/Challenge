const Sequelize = require('sequelize')
const db = require('../db')

const PuzzleOrders = db.define('PuzzleOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  subtotal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

PuzzleOrders.prototype.pullQuantity = function() {
  return this.quantity
}

PuzzleOrders.prototype.pullPrice = function() {
  return this.price
}

PuzzleOrders.generateSubtotal = function(quantity, puzzlePrice) {
  return quantity * puzzlePrice
}

/**
 * hooks
 */
const generateOrderData = puzzleOrder => {
  const quant = puzzleOrder.pullQuantity()
  const price = puzzleOrder.pullPrice()
  puzzleOrder.subtotal = PuzzleOrders.generateSubtotal(quant, price)
}

PuzzleOrders.beforeCreate(generateOrderData)
PuzzleOrders.beforeUpdate(generateOrderData)
PuzzleOrders.beforeBulkCreate(puzzleOrder => {
  puzzleOrder.forEach(generateOrderData)
})

module.exports = PuzzleOrders
