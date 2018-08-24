'use strict'

const db = require('../server/db')
const {User, Landmark} = require('../server/db/models')
const {james, customs, liberty,bull} = require('./blobs')

async function seed() {
 await db.sync({force: true})
 console.log('db synced!')
 const users = await Promise.all([
  User.create({email: 'cody@email.com', password: '123'}),
  User.create({email: 'a@gmail.com', password: '12'}),
  User.create({email: 'murphy@email.com', password: '123'}),
 ])
 console.log(`seeded ${users.length} users`)
 const landmarks = await Promise.all([
  Landmark.create({name: "James Watson house", rating: 4, comment: 'The dissonance is quite interesting', image: james.base64, userId: 3}),
  Landmark.create({name: "Alexander Hamilton U.S. Custom House", rating: 4, image: customs.base64, userId: 3}),
  Landmark.create({name: "Statue of Liberty", rating: 3, comment: 'So overrated', image: liberty.base64, userId: 3}),
  Landmark.create({name: "Charging Bull", rating: 5, image: bull.base64, userId: 3})
 ])
 console.log(`seeded ${landmarks.length} landmarks`)
 console.log(`seeded successfully`)
}

async function runSeed() {
 console.log('seeding...')
 try {
  await seed()
 } catch (err) {
  console.error(err)
  process.exitCode = 1
 } finally {
  console.log('closing db connection')
  await db.close()
  console.log('db connection closed')
 }
}

if (module === require.main) {
 runSeed()
}

module.exports = seed;