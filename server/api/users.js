const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// React Native server
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email}
    })
    if (user) {
      var userId = String(user.dataValues.id)
    }
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send({success: false, message: 'Wrong username'})
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send({success: false, message: 'Wrong password'})
    } else {
      res.send({success: true, userId: userId, email: req.body.email})
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await User.create(req.body)
    const userId = String(user.dataValues.id)
    res.send({success: true, userId: userId, email: req.body.email})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send({success: false, message: 'User already exists'} )
    } else {
      next(err)
    }
  }
})
