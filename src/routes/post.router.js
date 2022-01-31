const Router = require('express').Router;
const router = new Router();
const postController = require('../controller/post.controller')
const checkRole = require('../middlwares/checkRoleMiddleware')
const checkRules = require('../middlwares/checkRulesMiddleware')
const {body} = require('express-validator');

validationCreatePostRules = [
    body('userId', "userId must be longer than 3 symbols").not().isEmpty().escape(),
    body('header', "header must be longer than 3 symbols").isLength({min: 3}).not().isEmpty().escape(),
    body('text', "text must be longer than 3 symbols").isLength({min: 3}).not().isEmpty().escape(),
];

validationUpdatePostRules = [
    body('postId', "userId must be longer than 3 symbols").not().isEmpty().escape(),
    body('userId', "userId must be longer than 3 symbols").not().isEmpty().escape(),
    body('header', "header must be longer than 3 symbols").isLength({min: 3}).not().isEmpty().escape(),
    body('text', "text must be longer than 3 symbols").isLength({min: 3}).not().isEmpty().escape(),
];

router.post('/',checkRole("USER"), validationCreatePostRules, checkRules, postController.createPost);
router.get('/'/*checkRole("USER")*/, postController.getPosts);
router.get('/:userId',checkRole("ADMIN"), postController.getOnePost);
router.put('/', validationUpdatePostRules, checkRules, postController.updatePost);
router.delete('/:userId', postController.deletePost);

module.exports = router