const Sequelize = require('sequelize')
const db = require('../db')

const Thing = db.define('thing', {
  label: {
    type: Sequelize.STRING
  },
  label_r: {
    type: Sequelize.FLOAT
  },
  keywords: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  keywords_r: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Thing
