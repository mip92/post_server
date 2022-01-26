const {User, Token, Post} = require("../models/models");
const ApiError = require("../exeptions/api-error");
const bcrypt = require("bcrypt");
const tokenService = require("../service/token.service")
const UserDto = require('../dtos/user.dto')
const TokenService = require("../service/token.service");

class PostService {
    async isUserOwnerPost(accessToken,userId,postId){
        if (!accessToken) throw ApiError.UnauthorizedError()
        const decoded = TokenService.validateAccessToken(accessToken)
        if (!decoded) throw ApiError.UnauthorizedError()
        if (decoded.role !== "USER") throw ApiError.Forbiden("Forbiden")
        if (decoded.id !==userId) throw ApiError.UnauthorizedError()
        const user = await User.findOne({where: {id: userId}})
        if (!user) return throw ApiError.BadRequest("User not found")
        const post = await Post.findOne({where: {id: postId}})
        if (!post) return throw ApiError.BadRequest("Post not found")
        return post
    }
}

module.exports = new PostService()