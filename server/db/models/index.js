const User = require('./user')
const Landmark = require('./landmark')

Landmark.belongsTo(User)
User.hasMany(Landmark)

// We'll export all of our models here, so that any time a module needs a model,
// usuage : const { User } = require('path~/db/models)
module.exports = {
  User,
  Landmark,
}
