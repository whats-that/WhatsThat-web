'use strict'

const db = require('../server/db')
const {User, Landmark} = require('../server/db/models')
const {one, two} = require('./blobs')
/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'a@gmail.com', password: '12'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'bb@gmail.com', password: '123'}),
    User.create({email: 'cc@gmail.com', password: '123'}),
    User.create({email: 'dd@gmail.com', password: '123'}),
    User.create({email: 'ff@gmail.com', password: '123'}),
    User.create({email: 'gg@gmail.com', password: '123'}),
    User.create({email: 'hh@gmail.com', password: '123'}),
    User.create({email: 'kk@gmail.com', password: '123'}),
    User.create({email: 'rr@gmail.com', password: '123'}),
    User.create({email: 'tt@gmail.com', password: '123'}),
    User.create({email: 'qq@gmail.com', password: '123'}),
    User.create({email: 'ww@gmail.com', password: '123'}),
    User.create({email: 'ee@gmail.com', password: '123'}),
    User.create({email: 'yy@gmail.com', password: '123'}),
    User.create({email: 'uu@gmail.com', password: '123'}),
    User.create({email: 'ii@gmail.com', password: '123'}),

  ])
  console.log(`seeded ${users.length} users`)

  const landmarks = await Promise.all([
    Landmark.create({name: 'one', rating: 4, image: one.base64, userId: 1}),
    Landmark.create({name: 'two', image: two.base64, userId: 1})
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

module.exports = seed
