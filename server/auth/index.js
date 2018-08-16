const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.use('/google', require('./google'))

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      //  modify your /auth/login route so that instead of attaching the user id to req.session.userId, it gives the user to passport by using req.login.
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

 // modify your /auth/logout route so that in addition to using req.session.destroy, you let passport clean up after itself by using req.logout. You should still respond by sending a 204.
  // You want to use both req.logout and req.session.destroy because req.logout will only remove the things that passport put on the session - but anything else that you may have placed on the session will still be sticking around!
router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})


