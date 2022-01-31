const Router = require('express').Router;
const router = new Router();
const userController = require('../controller/user.controller')
const checkRole = require('../middlwares/checkRoleMiddleware')
const checkRules = require('../middlwares/checkRulesMiddleware')
const {body} = require('express-validator');

validationUpdateRules = [
    body('email', 'email must be a valid email format').not().isEmpty().isEmail().normalizeEmail(),
    body('password', "password must be longer than 3 symbols").isLength({min: 3}).not().isEmpty().escape(),
    body('name', "name must be longer than 3 symbols").isLength({min: 3}).not().isEmpty().escape(),
    body('role', "role must be valid").isLength({min: 3}).not().isEmpty().escape(),
    body('id', "id must be valid").not().isEmpty().escape(),
];

router.get('/:userId'/*,checkRole("USER")*/, userController.getOneUser);
router.get('/',checkRole("USER"), userController.getUsers);
router.put('/',checkRole("ADMIN"), validationUpdateRules, checkRules, userController.updateUser);
router.delete('/:userId',checkRole("ADMIN"),  userController.deleteUser);

module.exports = router