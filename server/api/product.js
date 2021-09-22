const router = require('express').Router()
const {Product} = require('../db/models')
const {isAdmin} = require('./gatekeepers')
const {Op} = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const product = await Product.findAll()
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  const pid = req.params.productId
  try {
    const oneproduct = await Product.findByPk(pid)
    res.json(oneproduct)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    if (!req.body.imageUrl) {
      req.body.imageUrl =
        'https://atzcart.s3.ap-south-1.amazonaws.com/uploads/images/categories/default.png'
    }
    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      pieceCount: req.body.pieceCount,
      dimensions: req.body.dimensions,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      description: req.body.description
    })
    res.send(product)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', isAdmin, async (req, res, next) => {
  const id = req.params.productId
  try {
    const updateproduct = await Product.findByPk(id)
    await updateproduct.update({
      title: req.body.title,
      price: req.body.price,
      pieceCount: req.body.pieceCount,
      dimensions: req.body.dimensions,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      description: req.body.description
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', isAdmin, async (req, res, next) => {
  const id = req.params.productId
  try {
    const Outstockproduct = await Product.findByPk(id)
    await Outstockproduct.update({
      pieceCount: 0,
      description: 'Product Is Currently Out Of Stock, please Check Back Later!'
    })
    res.send()
  } catch (error) {
    next(error)
  }
})

router.get('/search/:keyword', async (req, res, next) => {
  const keyword = req.params.keyword
  try {
    const rows = await Product.findAll({
      where: {
        title: {
          [Op.like]: '%' + keyword + '%'
        }
      }
    })
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

module.exports = router
