const {User, Token} = require("../models/models");
const ApiError = require("../exeptions/api-error");
const bcrypt = require("bcrypt");
const tokenService = require("../service/token.service")
const UserDto = require('../dtos/user.dto')

class UserService {
    async getUsers(limit, offset){
        const users = await User.findAndCountAll({
            limit,
            offset,
            attributes: { exclude: ['password'] }})
        return users
    }
}

module.exports = new UserService()