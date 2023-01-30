const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();

const saltRounds = parseInt(process.env.SALT_OR_ROUND) || 10;
const jwtSecret = process.env.JWT_SECRET || 'super_secret'

module.exports = {
    verifyPassword: async (loginPassword, userPassword) => {
        try {
            const isValidPassword = await bcrypt.compare(loginPassword, userPassword)
            return isValidPassword
        } catch (error) {
            console.error(error)
            return false
        }
    },

    hashPassword: async (password) => {
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            return hashedPassword
        } catch (error) {
            throw error
        }
    },

    isUserExists: (email) => {
        return prisma.user.findUnique({
            where: { email }
        })
    },

    getToken: (payload) => {
        return jwt.sign(payload, jwtSecret, { expiresIn: '365d' });
    }

}