const UserService = require("../service/user.service")
const LoginService = require("../service/login.service")

class LoginController {
    async registration(req, res, next) {
        try {
            const {email, name, password} = req.body
            const user = await LoginService.registration(name, email, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 62 * 60 * 1000, httpOnly: true})
            return res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await LoginService.login(email, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 62 * 60 * 1000, httpOnly: true})
            return res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await LoginService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(201).json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const user = await LoginService.refresh(refreshToken)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 62 * 60 * 1000, httpOnly: true})
            return res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new LoginController()