const router = require('express').Router()
const path = require('path')
const fs = require('fs')
var fs2 = require('fs-path')
const vision = require('@google-cloud/vision')
const textToSpeech = require('@google-cloud/text-to-speech')
const {Landmark} = require('../db/models')

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

    const landmark = landmarkDectectionResult[0].landmarkAnnotations[0]
  
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

    res.send(returnObj)

    res.end()
  } catch (err) {
    next(err)
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
    const filename = path.join(__dirname, '../../out.png')
    const textDetectionResult = await client.textDetection(filename)

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
        }
      )
    })
    res.send(text)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
