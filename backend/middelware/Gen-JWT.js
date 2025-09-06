const jwt = require('jsonwebtoken');

async function genTokens(userInfo) {
    const accessToken = jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: '1m'
    });
    return accessToken;
}

module.exports = genTokens;
