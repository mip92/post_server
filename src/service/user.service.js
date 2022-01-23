const jwt = require("jsonwebtoken");
const {User} = require("../models/models");
const ApiError = require("../exeptions/api-error");
const bcrypt = require("bcrypt");
const tokenService = require("../service/token.service")
const UserDto = require('../dtos/user.dto')

class UserService {
    async registration(name, email, password) {
        const candidate = await User.findOne({where: {email}})
        if (candidate) return ApiError.BadRequest("Пользователь с такой почтой уже существует")
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
}

module.exports = new UserService()