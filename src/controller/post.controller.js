const {Post, User} = require('../models/models')
const ApiError = require('../exeptions/api-error')
const PostService = require("../service/post.service");


class PostController {
    async createPost(req, res, next) {
        try {
            const {userId, header, text} = req.body
            const author = await User.findOne({where: {id: userId}})
            if (!author) return next(ApiError.BadRequest("User with this id is not found"))
            const newPost = await Post.create({header, text, userId});
            return res.status(201).json(newPost)
        } catch (e) {
            next(e)
        }
    }

    async getPosts(req, res, next) {
        try {
            let {limit, offset, userId} = req.query
            let posts
            if (limit > 50) limit = 50
            if (!offset) offset = 0
            if (userId) posts = await Post.findAndCountAll({limit, offset, where: {userId}})
            else posts = await Post.findAndCountAll({limit, offset})
            if (!posts) return next(ApiError.BadRequest("Posts not found"))
            res.status(200).json(posts)
        } catch
            (e) {
            next(e)
        }
    }

    async getOnePost(req, res, next) {
        try {
            const {postId} = req.params
            const post = await Post.findOne({where: {id: postId}})
            if (!post) return next(ApiError.BadRequest("Post not found"))
            res.status(200).json(post)
        } catch (e) {
            next(e)
        }
    }

    async updatePost(req, res, next) {
        try {
            const {postId, userId, header, text} = req.body
            const accessToken = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            const post = await PostService.isUserOwnerPost(accessToken, userId, postId)
            await post.update({header, text})
            const newPost = {id: postId, header, text, userId}
            res.status(200).json(newPost)
        } catch (e) {
            next(e)
        }
    }

    async deletePost(req, res, next) {
        try {
            const {postId, userId} = req.body
            const accessToken = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            const post = await PostService.isUserOwnerPost(accessToken, userId, postId)
            await post.destroy()
            res.status(200).json({message: `post with id:${postId} was deleted`})
        } catch (e) {
            next(ApiError.BadRequest(e.parent.detail))
        }
    }
}

module.exports = new PostController()