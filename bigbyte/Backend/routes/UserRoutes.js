const express = require('express');
const router = express.Router();

const AuthenticationController = require('../controllers/Authentication');

router.route('/SignUp').post(AuthenticationController.SignUp,AuthenticationController.RedirectToStore);

 router.route('/login').post(AuthenticationController.Login ,AuthenticationController.RedirectToStore);
// router.route('/SignOut').post(AuthenticationController.login ,AuthenticationController.RedirectToStorePage);
// router.route('/DeleteAccount').post(AuthenticationController.login ,AuthenticationController.RedirectToStorePage);
module.exports = router;

//User can send request here for SignUp/login and then be redicrected accordingly