const TokenService = require('../service/token.service')

module.exports = function(role) {
    return function (req, res, next) {

        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const accessToken = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            if (!accessToken) {
                return res.status(401).json({message: "Unauthorized"})
            }
            const decoded = TokenService.validateAccessToken(accessToken)
            if (!decoded) return res.status(401).json({message: "Unauthorized"})
            if (decoded.role !== role) {
                return res.status(403).json({message: "Forbidden"})
            }
            req.user = decoded;
            next()
        } catch (e) {
            console.log(e)
            res.status(401).json({message: "Unauthorized"})
        }
    };
}



