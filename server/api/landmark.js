const router = require('express').Router()
const {Landmark} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const landmarks = await Landmark.findAll()
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
      coordinates: req.body.coordinates
    })
    res.status(201).json(landmark)
  } catch (err) {
    next(err)
  }
})
