const Router = require('express')
const router = new Router()

const postRouter=require('./post.router')
const userRouter=require('./user.router')

router.use('/post',postRouter)
router.use('/user',userRouter)

module.exports=router