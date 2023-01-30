const { verifyPassword } = require('../utils/users_helper')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getToken } = require('../utils/users_helper')
const { findOneById, findOneByEmail } = require('../services/user.service')

async function localStrategy(username, password, done) {
    try {
        const user = await findOneByEmail(username)
        if (!user) { return done(null, false); }
        const isUserValid = await verifyPassword(password, user.password)
        if (!isUserValid) return done(null, false)
        const jwt = getToken({
            id: user.id,
            email: user.email
        })
        user.jwt = jwt
        return done(null, user);
    } catch (error) {
        console.error(error)
        return done(null, false);
    }
}

async function jwtStrategy(id, done) {
    try {
        const user = await findOneById(id)
        if (user) return done(null, user);
        return done(null, false);
    } catch (error) {
        console.error(error)
        return done(null, false);
    }

}

module.exports = {
    localStrategy,
    jwtStrategy
}



