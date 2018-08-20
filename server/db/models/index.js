const User = require('./user')
const Landmark = require('./landmark')
const Thing = require('./thing')

Landmark.belongsTo(User)
User.hasMany(Landmark)
Thing.belongsTo(User)
User.hasMany(Thing)



// We'll export all of our models here, so that any time a module needs a model,
// usuage : const { User } = require('path~/db/models)
module.exports = {
  User,
  Landmark,
  Thing
}
