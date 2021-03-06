const jwt = require("jsonwebtoken");
const {Token} = require("../models/models");

class TokenService{
    generateToken(payload) {
        //const payload={email, id, role}
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'},)
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where: {userId}})
        if (tokenData) {
            await tokenData.update({refreshToken})
            return tokenData
        }
        return await Token.create({userId, refreshToken})
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({where: {refreshToken}})
        return tokenData
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

}
module.exports= new TokenService()