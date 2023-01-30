var express = require('express');
var router = express.Router();
var passport = require('passport');
const jwtTool = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { jwtStrategy } = require('../strategy')
const jwtSecret = process.env.JWT_SECRET || 'super_secret'
const { findOneById } = require('../services/user.service')
const extractToken = require('../utils/extract_token')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  jwtStrategy(jwt_payload.id, done)
}))


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const jwt = extractToken(req)
    const payload = jwtTool.verify(jwt, jwtSecret);
    const user = await findOneById(payload.id)
    const { password, password_reset_token, ...userTosend } = user
    return res.status(200).json({ ...userTosend })
  } catch (error) {
    console.error
    return res.status(401).json({ error: error.message })
  }
})


module.exports = router;
