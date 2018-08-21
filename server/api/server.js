'use strict'

const router = require('express').Router()
const path = require('path')
const fs = require('fs')
var fs2 = require('fs-path')
const vision = require('@google-cloud/vision')
const textToSpeech = require('@google-cloud/text-to-speech')
const {Landmark} = require('../db/models')

const {Compute} = require('google-auth-library')

/**
 * Acquire a client, and make a request to an API that's enabled by default.
 */
async function main() {
  const client = new Compute({
    // Specifying the serviceAccountEmail is optional. It will use the default
    // service account if one is not defined.
    serviceAccountEmail: 'heart2529@gmail.com'
  })
  const projectId = 'test1-211018'
  const url = `https://www.googleapis.com/dns/v1/projects/${projectId}`
  const res = await client.request({url})
  console.log(res.data)
}

main().catch(console.error)

router.post('/getDataFromGoogleAPI', async (req, res, next) => {
  try {
    const client = new vision.ImageAnnotatorClient()
    const blob = req.body.base64
    var img = `data:image/png;base64,${blob}`
    let base64Data = img.replace(/^data:image\/png;base64,/, '')
    let binaryData = new Buffer.from(base64Data, 'base64').toString('binary')
    await fs.writeFile('out.png', binaryData, 'binary', function(err) {
      console.log('image error: ', err) // writes out file without error, but it's not a valid image
    })

    console.log('Start Google Vision API... ')
    const filename = path.join(__dirname, '../../out.png')

    const [
      landmarkDectectionResult,
      webDetectionResult,
      labelDetectionResult
    ] = await Promise.all([
      client.landmarkDetection(filename),
      client.webDetection(filename),
      client.labelDetection(filename)
    ])
    console.log('processing...')
    console.log(
      'web dection.webEntities ... : ',
      webDetectionResult[0].webDetection
    )
    console.log(
      'label dection[0].labelAnnotations.. ',
      labelDetectionResult[0].labelAnnotations[0]
    )
    console.log(
      'web dection visuals ... : ',
      webDetectionResult[0].webDetection.visuallySimilarImages
    )

    const landmark = landmarkDectectionResult[0].landmarkAnnotations[0]
    console.log('Landmark Detection Start... ')
    console.log(landmark)

    var returnObj = {}
    if (landmark) {
      returnObj = {
        name: landmark.description,
        image: blob,
        coordinates: [
          landmark.locations[0].latLng.latitude,
          landmark.locations[0].latLng.longitude
        ],
        accuracy: Number(landmark.score.toFixed(2)),
        webEntities: webDetectionResult[0].webDetection.webEntities,
        webImages: webDetectionResult[0].webDetection.visuallySimilarImages,
        label: labelDetectionResult[0].labelAnnotations[0]
      }
    } else {
      returnObj = {
        webEntities: webDetectionResult[0].webDetection.webEntities,
        webImages: webDetectionResult[0].webDetection.visuallySimilarImages,
        label: labelDetectionResult[0].labelAnnotations[0]
      }
    }

    // const logo = logoDetectionResult[0].logoAnnotations[0].description
    // const logo_acc = logoDetectionResult[0].logoAnnotations[0].score
    // try w/ all
    // if (logo) console.log('logo is...', logo)
    // else console.log('no logo')
    console.log('touch here')
    res.send(returnObj)

    res.end()
    // res.setHeader('Content-Type', 'text/html')
    // res.redirect('/')
  } catch (err) {
    // res.send("fail")
    console.error('Detection Process Completed...')
  }
})

router.post('/textToVoice', async (req, res, next) => {
  try {
    const client = new vision.ImageAnnotatorClient()
    const blob = req.body.base64
    var img = `data:image/png;base64,${blob}`
    let base64Data = img.replace(/^data:image\/png;base64,/, '')
    let binaryData = new Buffer.from(base64Data, 'base64').toString('binary')
    await fs.writeFile('out.png', binaryData, 'binary', function(err) {
      console.log(err) // writes out file without error, but it's not a valid image
    })
    console.log('Start Google Vision API (TextDetection)... ')
    const filename = path.join(__dirname, '../../out.png')
    const textDetectionResult = await client.textDetection(filename)
    console.log('processing...')
    console.log(
      'web dection.... : ',
      textDetectionResult[0].textAnnotations[0].description
    )

    // Creates a client
    const client2 = new textToSpeech.TextToSpeechClient()
    // The text to synthesize
    const text = textDetectionResult[0].textAnnotations[0].description
    // Construct the request
    const request = {
      input: {text},
      // Select the language and SSML Voice Gender (optional)
      voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
      // Select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'}
    }
    // Performs the Text-to-Speech request
    client2.synthesizeSpeech(request, (err, response) => {
      if (err) {
        console.error('ERROR:', err)
        return
      }
      // Write the binary audio content to a local file
      fs2.writeFile(
        '../mobile/screens/out.mp3',
        response.audioContent,
        'binary',
        err => {
          if (err) {
            console.error('ERROR:', err)
            return
          }
          console.log('Audio content written to file: output.mp3')
        }
      )
    })
    res.send(text)
  } catch (err) {
    console.error(err)
  }
})

/* =========================================================== */
router.get('/', (req, res, next) => {
  try {
    res.send('working...')
  } catch (err) {
    console.error(err)
  }
})

/* to test Google API */
router.get('/getDataFromGoogleAPI', async (req, res, next) => {
  try {
    const client = new vision.ImageAnnotatorClient()
    console.log('Start Google Vision API... ')
    const filename = path.join(__dirname, '../../img1.jpg')

    const landmarkDectectionResult = await client.landmarkDetection(filename)

    console.log('processing...')
    const landmark = landmarkDectectionResult[0].landmarkAnnotations[0]
    console.log('Landmark Detection Start... ')
    console.log(landmark)

    // var returnObj = {}
    //   if (landmark) {
    //   returnObj = {
    //     name: landmark.description,
    //     image: blob,
    //     coordinates: [
    //       landmark.locations[0].latLng.latitude,
    //       landmark.locations[0].latLng.longitude
    //     ],
    //     accuracy: Number(landmark.score.toFixed(2)),
    //     webEntities: webDetectionResult[0].webDetection.webEntities,
    //     webImages: webDetectionResult[0].webDetection.visuallySimilarImages,
    //     label: labelDetectionResult[0].labelAnnotations[0]
    //   }
    // } else {
    //   returnObj = {
    //     webEntities: webDetectionResult[0].webDetection.webEntities,
    //     webImages: webDetectionResult[0].webDetection.visuallySimilarImages,
    //     label: labelDetectionResult[0].labelAnnotations[0]
    //   }
    // }

    console.log('touch here')
    res.send('Happy!')
    res.end()
  } catch (err) {
    console.error('Detection Process Completed...')
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
