const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/landmark', require('./landmark'))
router.use('/thing', require('./thing'))
router.use('/server', require('./server'))
router.use('/yelp', require('./yelp'))
router.use('/geocoder', require('./geocoder'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
