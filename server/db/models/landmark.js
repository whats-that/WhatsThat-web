const Sequelize = require('sequelize')
const db = require('../db')

const LandMark = db.define('landmark', {
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.BLOB
  },
  coordinates: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  }
})

module.exports = LandMark
