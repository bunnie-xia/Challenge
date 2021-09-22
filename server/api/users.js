const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin, userLoggedIn} = require('./gatekeepers')
module.exports = router

// get all users
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get specific user
router.get('/:userId', userLoggedIn, async (req, res, next) => {
  const uid = req.params.userId
  try {
    const user = await User.findByPk(uid)
    if (user) {
      if (user.isAdmin) {
        req.session.passport.isAdmin = true
      }
      res.send(user)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    next(error)
  }
})

// update user info
router.put('/:userId', async (req, res, next) => {
  //add middleware
  try {
    const foundUser = await User.findByPk(req.params.userId)
    if (foundUser) {
      const updatedUser = await foundUser.update(req.body)
      res.json(updatedUser)
    } else {
      res.status(404).send('Sorry, User Not Found!')
    }
  } catch (error) {
    next(error)
  }
})
