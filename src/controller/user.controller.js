const {User} = require('../models/models')
const ApiError = require('../exeptions/api-error')
const bcrypt = require("bcrypt");
const UserService = require("../service/user.service")


class UserController {
    async getUsers(req, res, next) {
        try {
            let {limit, offset} = req.query
            if (limit > 50) limit = 50
            if (!offset) offset = 0
            const users = await UserService.getUsers(limit, offset)
            if (!users) return next(ApiError.BadRequest("Users not found"))
            res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }

    async getOneUser(req, res, next) {
        try {
            const userId = req.params.userId
            const user = await User.findOne({
                    //include: 'Post',/*{all: true},*/
                    attributes: { exclude: ['password'] },
                    where: {id: userId},
                }
            )
            if (!user) return next(ApiError.BadRequest("User not found"))
            res.status(200).json(user)
        } catch (e) {
            next(ApiError.BadRequest(e.parent.detail))
        }
    }

    async updateUser(req, res, next) {
        try {
            const {id, email, role, name, password} = req.body
            const user = await User.findOne({where: {id}})
            if (!user) return next(ApiError.BadRequest("User not found"))
            const isEmailUniq = await User.findOne({where: {email}})
            if (isEmailUniq===user){
                const hashPassword = await bcrypt.hash(password, 5)
                await user.update({email, name, role, password:hashPassword})
                const newUser = {id, email, name, role}
                res.status(200).json(newUser)
            }
            else if (isEmailUniq) return next(ApiError.BadRequest("User with this email is already be exist"))
        } catch (e) {
            next(ApiError.BadRequest(e.parent.detail))
        }
    }

    async deleteUser(req, res, next) {
        try {
            const {userId} = req.params
            if (!userId) next(ApiError.BadRequest("id is not defined"))
            const candidate = await User.findOne({where: {id: userId}})
            if (!candidate) next(ApiError.BadRequest(`user with id:${userId} is not defined`))
            await User.destroy({where: {id: userId}})
            res.status(200).json({message: `user with id:${userId} was deleted`, user: candidate})
        } catch (e) {
            next(ApiError.BadRequest(e.parent.detail))
        }
    }
}

module.exports = new UserController()