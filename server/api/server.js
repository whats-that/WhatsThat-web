'use strict'

const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const vision = require('@google-cloud/vision')
const {Landmark} = require('../db/models')

router.post('/getDataFromGoogleAPI', async (req, res, next) => {
  try {
    const client = new vision.ImageAnnotatorClient()
    const blob = req.body.base64
    let binaryData = new Buffer.from(blob, 'base64').toString('binary')
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

router.post('/text', async (req, res, next) => {
  try {
    const client = new vision.ImageAnnotatorClient()
    const blob = req.body.base64
    let binaryData = new Buffer.from(blob, 'base64').toString('binary')
    await fs.writeFile('out.png', binaryData, 'binary', function(err) {
      console.log(err) // writes out file without error, but it's not a valid image
    })
    const filename = path.join(__dirname, '../../out.png')
    const textDetectionResult = await client.textDetection(filename)
    const text = textDetectionResult[0].textAnnotations[0].description
    res.send(text)
  } catch (err) {
    console.error(err)
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
