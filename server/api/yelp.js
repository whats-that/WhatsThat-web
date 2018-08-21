const router = require('express').Router()
const axios = require('axios')

router.post('/', async (req, res, next) => {
  try {
    const {query, latitude, longitude} = req.body
    const instance = axios.create({
      baseURL: 'https://api.yelp.com/v3/businesses/',
      headers: {Authorization: `Bearer ${process.env.Yelp_API_Key}`}
    })
    const response = await instance.get(`/search?term=${query}&latitude=${latitude}&longitude=${longitude}&limit=10`)
    const restaurant = response.data.businesses[0].url
    res.json(restaurant)
  } catch (error) {
    next(error)
  }
})

module.exports = router