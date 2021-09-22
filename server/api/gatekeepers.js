const {User} = require('../db/models')

const unauthorized = next => {
  const err = new Error("I can't let you do that.")
  err.status = 401
  return next(err)
}

const isAdmin = async (req, res, next) => {
  if (req.session.passport) {
    // check if user exist?
    const user = await User.findByPk(req.session.passport.user) // get user info, in session only shows id
    if (!user.isAdmin) {
      unauthorized(next)
    }
  }
  next()
}

const userLoggedIn = (req, res, next) => {
  // Check if same user
  if (req.session.passport) {
    const thisUser = req.session.passport.user
    const accessedUser = parseInt(req.params.userId)
    if (accessedUser !== thisUser && !req.session.passport.isAdmin) {
      unauthorized(next)
    }
  } else {
    unauthorized(next)
  }
  next()
}

module.exports = {
  isAdmin,
  userLoggedIn
}
