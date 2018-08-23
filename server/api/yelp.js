const router = require('express').Router()
const axios = require('axios')

router.post('/', async (req, res, next) => {
  try {
    const {text, latitude, longitude} = req.body
    const instance = axios.create({
      baseURL: 'https://api.yelp.com/v3/businesses/',
      headers: {Authorization: `Bearer ${process.env.Yelp_API_Key}`}
    })
    const response = await instance.get(`/search?term=${text}&latitude=${latitude}&longitude=${longitude}&limit=1`)
    const restaurant = response.data.businesses[0].url
    res.json(restaurant)
  } catch (error) {
    next(error)
  }
})

module.exports = router