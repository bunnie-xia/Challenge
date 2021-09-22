/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../index')
const User = db.model('user')
const Product = db.model('product')
const Order = require('../order')
const ProductOrders = require('../productorder')

describe('Model Associations', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('ProductOrder through-table', () => {
    describe('correct subtotal for user line item', () => {
      let sandra
      let orderedProduct
      const qty = 2
      let newOrder
      let productOrder

      beforeEach(async () => {
        sandra = await User.create({
          firstName: 'Sandra',
          lastName: 'Dee',
          email: 'productmaniac@gollygeemail.com',
          password: 'i<3product'
        })

        orderedProduct = await Product.create({
          title: 'Hotrod at Sunset',
          price: 1888,
          pieceCount: 800,
          dimensions: '16" x 22"',
          category: 'Sports'
        })

        newOrder = await Order.create()

        await newOrder.addProduct(orderedProduct, {
          through: {quantity: qty, price: orderedProduct.price}
        })

        await newOrder.setUser(sandra.id)

        productOrder = await ProductOrders.findOne({
          where: {productId: orderedProduct.id}
        })
      })

      it('populates ProductOrders with correct data', () => {
        expect(productOrder.subtotal).to.be.equal(3776)
      })
    })
  })
})
