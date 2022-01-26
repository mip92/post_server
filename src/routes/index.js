const Router = require('express')
const router = new Router()

const postRouter=require('./post.router')
const userRouter=require('./user.router')
const loginRouter=require('./login.router')

router.use('/post',postRouter)
router.use('/user',userRouter)
router.use('/login', loginRouter)

module.exports=router