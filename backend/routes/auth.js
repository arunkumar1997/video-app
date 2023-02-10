const express = require('express');
const router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword, isUserExists, getToken } = require('../utils/users_helper')
const { localStrategy } = require('../strategy')
const { updateLastLogin } = require('../services/user.service')

const Validator = require('../validator/index');
passport.use(new LocalStrategy({ usernameField: 'email' }, localStrategy));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, jwt: user.jwt });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

router.post('/local/login', Validator('login'), passport.authenticate('local', {
    failureMessage: true
}), async (req, res) => {
    const { id } = req.session.passport.user
    const user = await updateLastLogin(id)
    return res.status(200).json({ data: req.session.passport.user })
});

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.status(200).json({ message: 'logged out!' })
    });
});

router.post('/local/signup', Validator('signup'), async function (req, res, next) {
    try {
        const payload = req.body
        const existingUser = await isUserExists(payload.email)
        if (existingUser) { return res.status(400).json({ error: `A user with email ${payload.email} already exist` }) }
        const newUser = {
            email: payload.email,
            password: payload.password,
            name: payload.name
        }
        const hashedPass = await hashPassword(payload.password)
        newUser.password = hashedPass

        const user = await prisma.user.create({
            data: newUser
        })
        delete user.password
        const jwt = getToken({
            id: user.id,
            email: user.email
        })
        user.jwt = jwt
        req.login(user, (err) => {
            if (err) {
                throw err
            }
            return res.status(200).json({ data: req.session.passport.user })
        })


    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error.message })
    }
})


module.exports = router