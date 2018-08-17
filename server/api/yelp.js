const router = require('express').Router()
const axios = require('axios')

// just a test route for the POST route
// router.get('/', async (req, res, next) => {
//   try {
//     let location = {
//       latitude: 40.704886099999996,
//       longitude: -74.00914379999999}
//     const restaurant = await axios.post('http://localhost:8080/api/yelp', {query:'McDonalds', location})
//     res.send(restaurant)
//   } catch (error) {
//     next(error)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    const {query, latitude, longitude} = req.body
    const instance = axios.create({
      baseURL: 'https://api.yelp.com/v3/businesses/',
      headers: {Authorization: `Bearer ${process.env.Yelp_API_Key}`}
    })
    const response = await instance.get(`/search?term=${query}&latitude=${latitude}&longitude=${longitude}&limit=10`)
    const restaurant = response.data.businesses[0]
    res.json(restaurant)
  } catch (error) {
    next(error)
  }
})

module.exports = router