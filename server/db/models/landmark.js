const Sequelize = require('sequelize')
const db = require('../db')

const Landmark = db.define('landmark', {
  name: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER,
    validations: {
      max: 5,
      min: 1
    },
    defaultValue: 5
  },
  comment: {
    type: Sequelize.TEXT
  },
  coordinates: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  },
  image: {
    type: Sequelize.TEXT
  },
  accuracy: {
    type: Sequelize.FLOAT
  }
})

module.exports = Landmark

/*
image: {
  type: Sequelize.BLOB
},
coordinates: {
  type: Sequelize.ARRAY(Sequelize.FLOAT)
}
})

module.exports = LandMark
*/
