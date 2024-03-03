const express = require('express');
const router = express.Router();


const AuthenticationController = require('../controllers/Authentication');
const UserController = require('../controllers/Users');


router.route('/SignUp').post(AuthenticationController.SignUp);
// router.route('/userDetails').post(AuthenticationController.verifyToken,AuthenticationController.CreateDetailsAboutUser);
router.route('/userDetails').post(AuthenticationController.CreateDetailsAboutUser);
router.route('/login').post(AuthenticationController.Login, AuthenticationController.RedirectToStore);
// router.route('/SignOut').post(AuthenticationController.login ,AuthenticationController.RedirectToStorePage);
// router.route('/DeleteAccount').post(AuthenticationController.login ,AuthenticationController.RedirectToStorePage);

router.route('/AddUser').post(UserController.addUser);
router.route('/QueryUsers').get(UserController.queryUsers);
router.route('/DeleteUser').delete(UserController.deleteUser);
router.route('/GetUser').get(UserController.getUser);

module.exports = router;

/*
router.route('/AddMentor').post(MentorController.addMentor);
router.route('/QueryMentors').get(MentorController.queryMentors);
router.route('/DeleteMentor').delete(MentorController.deleteMentor);
router.route('/GetMentor').get(MentorController.getMentor);
*/
//User can send request here for SignUp/login and then be redicrected accordingly