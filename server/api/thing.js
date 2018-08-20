const router = require('express').Router()
const {Thing} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const things = await Thing.findAll()
    res.json(things)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    console.log('server... userId', req.params.userId)
    const things = await Thing.findAll({
      where: {
        userId: req.params.userId
      }
    })
    console.log(things)
    res.json(things)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('start create thing in server... ')
    const thing = await Thing.create({
      label: req.body.label,
      label_r: req.body.label_r,
      keywords: req.body.keywords,
      keywords_r: req.body.keywords_r,
      images: req.body.images,
      userId: req.body.userId
    })
    res.status(201).json(thing)
  } catch (err) {
    next(err)
  }
})
