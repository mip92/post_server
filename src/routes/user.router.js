const Router = require('express').Router;
const router = new Router();
const userController = require('../controller/user.controller')
const checkRole = require('../middlwares/checkRoleMiddleware')
const checkRules = require('../middlwares/checkRulesMiddleware')
const {body} = require('express-validator');

validationRegistrationRules = [
    body('name', "name must be longer than 3 symbols").isLength({min: 3}).not().isEmpty().escape(),
    body('email', 'email must be a valid email format').not().isEmpty().isEmail().normalizeEmail(),
    body('password', "password must be longer than 3 symbols").isLength({min: 3}).not().isEmpty().escape(),
];


router.post('/',validationRegistrationRules, checkRules, userController.registration);
/*router.get('/',checkRole("ADMIN"), userController.getAllUsers);
router.get('/:userId',checkRole("ADMIN"), userController.getOneUser);
router.put('/',checkRole("ADMIN"), userController.updateUser);
router.delete('/:userId',checkRole("ADMIN"),  userController.deleteUser);*/

module.exports = router