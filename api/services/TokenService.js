const jwt = require('jsonwebtoken');

class TokenService {

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }


    generateRefreshToken(payload) {
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn:"30d"});
        return {refreshToken};
    }
}

module.exports = TokenService;