const router = require('express').Router()

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')

module.exports = router

// current route : /auth/google

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }

  // For passport.authenticate to work, it needs a strategy
  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
      const googleId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value

      User.findOrCreate({
        where: {googleId},
        defaults: {name, email}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )
  passport.use(strategy)

  // Google authentication and login (GET /auth/google)
  // This is the route that users hit when they click Sign In With Google
  router.get('/', passport.authenticate('google', {scope: 'email'}))
  // Though this by itself will not work. That first argument to passport.authenticate, the string 'google' refers to what passport calls a "strategy"

  // This is the route that the Provider sends the user back to (along with the temporary auth token)
  // after they "sign the contract".
  router.get('/callback', passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
  // handles the callback after Google has authenticated the user (GET /auth/google/callback)
  // passport.authenticate will automatically send us to google (with the auth token and our client secret),
  // and once we clear things with google, we will return to our verification callback with the permanent
  // user token and any profile information we're allowed to see
}
