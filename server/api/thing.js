const router = require('express').Router()
const { Thing } = require('../db/models')
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
    const things = await Thing.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(things)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    var thing;
    if (!req.body.userId) {
      thing = await Thing.create({
        label: req.body.label,
        label_r: req.body.label_r,
        keywords: req.body.keywords,
        keywords_r: req.body.keywords_r,
        images: req.body.images,
      })
    } else {
      thing = await Thing.create({
        label: req.body.label,
        label_r: req.body.label_r,
        keywords: req.body.keywords,
        keywords_r: req.body.keywords_r,
        images: req.body.images,
        userId: req.body.userId
      })
    }
    res.status(201).json(thing)
  } catch (err) {
    next(err)
  }
})
