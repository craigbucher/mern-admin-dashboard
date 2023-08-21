import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy
import mongoose, { now } from 'mongoose';
import User from '../models/User.js';

// from Passport documentation
const passPortFunction = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` })
      }
      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) {
          console.log('password match')
          return done(null, user) // successful match
        }
        return done(null, false, { msg: 'Invalid email or password.' })
      })
    })
  }))
  
  // determines which data of the user object should be stored in the session. 
  // The result of the serializeUser method is attached to the session as 
  // req.session.passport.user = {}
  // The user id (you provide as the second argument of the done function) is 
  // saved in the session and is later used to retrieve the whole object via 
  // the deserializeUser function
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // In deserializeUser the key (here = 'id') is matched with the in memory 
  // array / database or any data resource.
  // The fetched object is attached to the request object as 'req.user'
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });              │
//                │ 
//                │
//                └─────────────────┬──→ saved to session
//                                  │    req.session.passport.user = {id: '..'}
//                                  │
//                                  ↓           
// passport.deserializeUser(function(id, done) {
//                  ┌───────────────┘
//                  │
//                  ↓ 
//   User.findById(id, function(err, user) {
//       done(err, user);
//   });            └──────────────→ user object attaches to the request as req.user   
// });

export default passPortFunction