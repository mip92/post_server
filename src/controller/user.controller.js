const {User} = require('../models/models')
const ApiError = require('../exeptions/api-error')
const bcrypt = require("bcrypt");
const UserService = require("../service/user.service")

class UserController {
    /*    const candidate = await this.userService.getUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const userAvatar = this.fileService.createFile(FileType.IMAGE, avatar)
        const hashPassword = await bcrypt.hash(dto.password, 5)
        const activationLink = await uuid.v4()
        const email = dto.email
        await this.mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
    const user = await this.userService.createUser({email, password: hashPassword}, userAvatar, activationLink)
    const tokens = this.generateToken(user)
    await this.saveToken(user.id, tokens.refreshToken)
    return {
    ...tokens,
    userAvatar,
    userId: user.id,
    email: user.email,
    isActivated: false////Допилить
    }*/
    async registration(req, res, next) {
        try {
            const {email, name, password} = req.body
            const user = await UserService.registration(name, email, password)
            res.cookie('refreshToken',user.refreshToken, {maxAge:30*24*62*60*1000, httpOnly: true})
            return res.status(201).json(user)
        } catch (e) {
            console.log(11111)
            console.log(e.parent.detail)
            console.log(11111)
            next(ApiError.BadRequest(e.parent.detail))
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.BadRequest(e.parent.detail))
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.BadRequest(e.parent.detail))
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.BadRequest(e.parent.detail))
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json([123, 456])
        } catch (e) {
            next(ApiError.BadRequest(e.parent.detail))
        }
    }

    /*
        async getAllUsers(req, res, next) {
            try {
                let {limit, offset} = req.query
                if (limit > 50) limit = 50
                if (!offset) offset = 0
                let users = await User.findAndCountAll({limit, offset})
                if (!users) return next(ApiError.BadRequest("Users not found"))
                res.status(200).json(users)
            } catch (e) {
                next(ApiError.BadRequest(e.parent.detail))
            }
        }

        async getOneUser(req, res, next) {
            try {
                const userId = req.params.userId
                const user = await User.findOne({
                        include: {all: true},
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
                const {id, newEmail, newName} = req.body
                const user = await User.findOne({where: {id}})
                if (!user) return next(ApiError.BadRequest("User not found"))
                const isEmailUniq = await User.findOne({where: {email: newEmail}})
                if (isEmailUniq) return next(ApiError.BadRequest("User with this email is already be exist"))
                await user.update({email: newEmail, name: newName})
                const newUser = {id, email: newEmail, name: newName}
                res.status(200).json(newUser)
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
        }*/
}

module.exports = new UserController()