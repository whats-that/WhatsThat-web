const router = require('express').Router()
const { Landmark } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const landmarks = await Landmark.findAll()
    res.json(landmarks)
  } catch (err) {
    next(err)
  }
})

router.get('/id/:id', async (req, res, next) => {
  try {
    const landmarks = await Landmark.findById({
      where: {
        id: req.params.id
      },
      attributes: ['name', 'rating', 'comment', 'createdAt', 'image']
    })
    res.json(landmarks)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    console.log('server... userId', req.params.userId)
    const landmarks = await Landmark.findAll({
      where: {
        userId: req.params.userId
      },
      attributes: ['name', 'coordinates', 'userId', 'createdAt']
    })
    res.json(landmarks)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('start create landmark thunk... ')
    const landmark = await Landmark.create({
      name: req.body.name,
      image: req.body.image,
      coordinates: req.body.coordinates,
      userId: req.body.userId,
      accuracy: req.body.accuracy
    })
    res.status(201).json(landmark)
  } catch (err) {
    next(err)
  }
})
