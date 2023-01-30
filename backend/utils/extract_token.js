function extractToken(req) {
    const authHeader = req.headers.authorization
    const token = authHeader.split('Bearer ')[1]
    return token
}


module.exports = extractToken