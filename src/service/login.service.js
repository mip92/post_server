const {User, Token} = require("../models/models");
const ApiError = require("../exeptions/api-error");
const bcrypt = require("bcrypt");
const tokenService = require("../service/token.service")
const UserDto = require('../dtos/user.dto')

class LoginService {
    async registration(name, email, password) {
        const candidate = await User.findOne({where: {email}})
        if (candidate) throw ApiError.BadRequest("Пользователь с такой почтой уже существует")
        else {
            const hashPassword = await bcrypt.hash(password, 5)
            const newUser = await User.create({name, email, password: hashPassword, role: 'USER'});
            const userDto = new UserDto(newUser)
            const token = tokenService.generateToken({...userDto})
            await tokenService.saveToken(userDto.id, token.refreshToken)
            return {
                ...token,
                user: userDto
            }
        }
    }

    async login(email, password) {
        const user = await User.findOne({where: {email}})
        if (!user) throw ApiError.BadRequest("Пользователя с такой почтой не существует или пароль указан не верно")
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) throw ApiError.BadRequest("Пользователя с такой почтой не существует или пароль указан не верно")
        const userDto = new UserDto(user)
        const token = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, token.refreshToken)
        return {
            ...token,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError()
        const userData  = tokenService.validateRefreshToken(refreshToken)
        const tokenData = await Token.findOne({where: {refreshToken}})
        if (!userData || !tokenData) throw ApiError.UnauthorizedError()
        const user = await User.findOne({where:{id:userData.id}})  ///findbyPK?
        const userDto = new UserDto(user)
        const token = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, token.refreshToken)
        return {
            ...token,
            user: userDto
        }
    }
}

module.exports = new LoginService()