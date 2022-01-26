const Router = require('express').Router;
const router = new Router();
const loginController = require('../controller/login.controller')
const checkRules = require('../middlwares/checkRulesMiddleware')
const {body} = require('express-validator');

validationRegistrationRules = [
    body('name', "name must be longer than 3 symbols").isLength({min: 3}).not().isEmpty().escape(),
    body('email', 'email must be a valid email format').not().isEmpty().isEmail().normalizeEmail(),
    body('password', "password must be longer than 3 symbols").isLength({min: 3}).not().isEmpty().escape(),
];
validationLoginRules = [
    body('email', 'email must be a valid email format').not().isEmpty().isEmail().normalizeEmail(),
    body('password', "password must be longer than 3 symbols").isLength({min: 3}).not().isEmpty().escape(),
];

router.post('/registration',validationRegistrationRules, checkRules, loginController.registration);
router.post('/login',validationLoginRules, checkRules, loginController.login);
router.post('/logout', loginController.logout);
router.get('/refresh', loginController.refresh);

module.exports = router