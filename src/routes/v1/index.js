const express = require('express');
const UserController = require('../../controllers/user');
const {AuthRequestValidator} = require('../../middlewares/index');

const router = express.Router();

//User Signup
router.post('/signup',AuthRequestValidator.validateUserSignUp,UserController.createUser);
router.delete('/signup/:id',UserController.deleteUser);

//User SignIn
router.post('/signin',AuthRequestValidator.validateUserSignUp,UserController.signIn);

//Authentication
router.get('/isAuthenticated',UserController.isAuthentitcated);

router.get('/isAdmin',UserController.isAdmin);

//User info
router.get('/getEmail/:id',UserController.getById);


module.exports = router;