const TokenService = require('../service/token.service')

module.exports = function(role) {
    return function (req, res, next) {

        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const accessToken = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            console.log(accessToken)
            if (!accessToken) {
                return res.status(401).json({message: "Unauthorized"})
            }
            const decoded = TokenService.validateAccessToken(accessToken)
            if (!decoded) return res.status(401).json({message: "Unauthorized"})
            /*if (decoded.role !== role || decoded.role !== "ADMIN") {
                console.log(decoded.role)
                return res.status(403).json({message: "Forbidden"})
            }
            req.user = decoded;*/
            if (decoded.role === role || decoded.role === "ADMIN") {
                req.user = decoded;
                next()

            }
            else return res.status(403).json({message: "Forbidden"})
        } catch (e) {
            console.log(e)
            res.status(401).json({message: "Unauthorized"})
        }
    };
}



