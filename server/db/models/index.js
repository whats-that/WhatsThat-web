const User = require('./user')
const Landmark = require('./landmark')
const Thing = require('./thing')

Landmark.belongsTo(User)
User.hasMany(Landmark)
Thing.belongsTo(User)
User.hasMany(Thing)

module.exports = {
  User,
  Landmark,
  Thing
}
