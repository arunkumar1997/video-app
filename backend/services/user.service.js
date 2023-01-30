const { PrismaClient } = require('@prisma/client');
const { use } = require('passport');
const prisma = new PrismaClient();

async function findOneById(userId) {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}
async function findOneByEmail(email) {
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}

async function updateLastLogin(userId) {
    return prisma.user.update({
        where: {
            id: userId
        },

        data: {
            last_login: new Date()
        }
    })
}

module.exports = {
    findOneById,
    findOneByEmail,
    updateLastLogin
}