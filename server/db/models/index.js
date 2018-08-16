const User = require('./user')
const Landmark = require('./landmark')

Landmark.belongsTo(User)
User.hasMany(Landmark)

module.exports = {
  User, Landmark
}
