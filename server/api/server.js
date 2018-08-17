const router = require('express').Router()
const path = require('path')
// Imports the Google Cloud client library.
const vision = require('@google-cloud/vision')
const { Landmark } = require('../db/models')

router.post('/getDataFromGoogleAPI', (req, res, next) => {
  const client = new vision.ImageAnnotatorClient()
  const blob = req.body.base64
  var img = `data:image/png;base64,${blob}`
  let base64Data = img.replace(/^data:image\/png;base64,/, '')
  let binaryData = new Buffer.from(base64Data, 'base64').toString('binary')
  require('fs').writeFile('out.png', binaryData, 'binary', function(err) {
    console.log(err) // writes out file without error, but it's not a valid image
  })
  // const filename =
  //   '/Users/song/Workspace/FullstackAcademy/senior/whats-that/web/out.png'

  console.log('Start Google Vision API... ')
  const filename = path.join(__dirname, '../../out.png')


  client
    .landmarkDetection(filename)
    .then(results => {
      const landmarks = results[0].landmarkAnnotations
      console.log('Landmarks:')
      landmarks.forEach(landmark => {
        console.log(landmark)
        console.log(landmark.description)
        console.log(landmark.locations[0].latLng) // e.g. {latitude: 40.718639, longitude: -74.013519}
        res.setHeader("Content-Type", "text/html");
        // res.write('Process Completed...')
        const returnObj = {
          name: landmark.description,
          image: blob,
          coordinates: [landmark.locations[0].latLng.latitude, landmark.locations[0].latLng.longitude]
        }
        landmark.description ? res.send(returnObj) : res.send("no data")
        res.redirect('/')
        res.end()
      })
    .catch(err => {
      // console.log('Process Completed... ')
      console.error('Process Completed...', err)
      // console.error('ERROR..:', err)
    })
    // client
  //   .webDetection(filename)
  //   .then(results => {
  //     console.log(results)
  //     //need a helper function for saving to database
  //     res.json(results)
  //     res.send("oops didn't hit")

  // .labelDetection(filename)
  // .then(results => {
    //   const labels = results[0].labelAnnotations
    //   console.log('Results:', results)
    //   // labels.forEach(label => console.log(label.description))
    // })

  })
})



/* =========================================================== */

/* to test Google API */
router.get('/getDataFromGoogleAPI', (req, res, next) => {
  const client = new vision.ImageAnnotatorClient()
  const filename =
    '/Users/song/Workspace/FullstackAcademy/senior/whats-that/web/img1.jpg'

  client
    .landmarkDetection(filename)
    .then(results => {
      const landmarks = results[0].landmarkAnnotations
      console.log('Landmarks:')
      landmarks.forEach(landmark => {
        console.log(landmark)
        console.log(landmark.description)
        console.log(landmark.locations[0].latLng) // e.g. {latitude: 40.718639, longitude: -74.013519}
        res.send(landmark.description)
      })
    })

    // .labelDetection(filename)
    // .then(results => {
    //   const labels = results[0].labelAnnotations

    //   console.log('Results:', results)
    //   // labels.forEach(label => console.log(label.description))
    // })
    .catch(err => {
      console.error('ERROR:', err)
    })
  // res.send('get data from google API ...  ')
})

router.get('/history', async (req, res, next) => {
  try {
    const landmarks = await Landmark.findAll({
      where: {
        userId: 1
      },
      attributes: ['id', 'name', 'rating', 'comment']
    })
    res.json(landmarks)
  } catch (error) {
    next(error)
  }
})

router.get('/history/:id', async (req, res, next) => {
  try {
    console.log(req.params.id)
    const landmark = await Landmark.findById(req.params.id)
    res.json(landmark)
  } catch (error) {
    next(error)
  }
})

module.exports = router
// router.get('/savePicToBucket', (req, res, next) => {
//   // Creates a client
//   const storage = new Storage()
//   // Uploads a local file to the bucket
//   storage
//     .bucket(bucketName)
//     .upload(filename, {
//       // Support for HTTP requests made with `Accept-Encoding: gzip`
//       gzip: true,
//       metadata: {
//         // Enable long-lived HTTP caching headers
//         // Use only if the contents of the file will never change
//         // (If the contents will change, use cacheControl: 'no-cache')
//         cacheControl: 'public, max-age=31536000'
//       }
//     })
//     .then(() => {
//       console.log(`${filename} uploaded to ${bucketName}.`)
//     })
//     .catch(err => {
//       console.error('ERROR:', err)
//     })
//   res.send('store picture to the bucket ...  ')
// })

/* middleware to deal with header issue */
// // middleware that does not modify the response body
// var doesNotModifyBody = function(request, response, next) {
//   request.params = {
//     a: "b"
//   };
//   // calls next because it hasn't modified the header
//   next();
// };
// // middleware that modify the response body
// var doesModifyBody = function(request, response, next) {
//   response.setHeader("Content-Type", "text/html");
//   response.write("<p>Hello World</p>");
//   response.end();
//   // doesn't call next()
// };
// router.use(doesNotModifyBody);
// router.use(doesModifyBody);
