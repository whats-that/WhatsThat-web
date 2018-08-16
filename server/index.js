const path = require('path')
const express = require('express')
const morgan = require('morgan')

const db = require('./db')

const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({db})

const socketio = require('socket.io')

const PORT = process.env.PORT || 8080 // this can be very useful if you deploy to Heroku!
const app = express()
module.exports = app

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

/**
 * In your development environment, you can keep all of your app's secret API keys
 * in a file called `secrets.js`, in your project root.
 * This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
// after we find or create a user, we 'serialize' our user on the session
passport.serializeUser((user, done) => done(null, user.id))
// If we've serialized the user on our session with an id, we look it up here and attach it as 'req.user'.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logger > body-parser > express.static > routes > error handling
  // logging middleware
  app.use(morgan('dev'))
  // body parsing middleware
  app.use(express.json({limit:'100mb'}))
  app.use(express.urlencoded({extended: true}))

  // compression middleware : reduce page loads time to the order of 15-20% (GZIP compression)
  app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )

  // Since passport sessions rely on an existing session architecture, make sure these middleware declarations come after the express session middleware (but before your API middleware).
  // consumes 'req.session' so that passport can know what's on the session
  app.use(passport.initialize())
  // this will invoke our registered 'deserializeUser' method and attempt to put our user on 'req.user'
  app.use(passport.session())

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))
  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
