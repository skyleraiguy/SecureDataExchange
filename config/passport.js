const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.example.com/oauth2/authorize',
    tokenURL: 'https://www.example.com/oauth2/token',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    // Here, we will create a JWT and return it
    const token = jwt.sign({ user: profile.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return cb(null, token);
  }
));

module.exports = passport;
