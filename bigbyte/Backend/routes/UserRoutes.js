const express = require('express');
const router = express.Router();


const AuthenticationController = require('../controllers/Authentication');
const UserController = require('../controllers/Users');


// AUTHENTICATION ROUTES
router.route('/SignUp').post(AuthenticationController.SignUp);
// router.route('/userDetails').post(AuthenticationController.verifyToken,AuthenticationController.CreateDetailsAboutUser);
router.route('/userDetails').post(AuthenticationController.verifyToken, AuthenticationController.CreateDetailsAboutUser);
router.route('/login').post(AuthenticationController.Login);
router.route('/SignOut').post(AuthenticationController.SignOut, AuthenticationController.RedirectToStore); //later change redirect to login
// router.route('/DeleteAccount').post(AuthenticationController.login ,AuthenticationController.RedirectToStorePage);


// DATABASE ROUTES
router.route('/AddUser').post(UserController.addUser);
router.route('/QueryUsers').get(UserController.queryUsers);
router.route('/DeleteUser').delete(UserController.deleteUser);
router.route('/GetUser').get(AuthenticationController.verifyToken,UserController.getUser);
router.route('/GetUserType').get(AuthenticationController.verifyToken,AuthenticationController.DetermineuserType);

router.route('/ApplyToInternship').post(UserController.applyForInternship);


// // TO HANDLE RESUMES
// router.route('/UploadResume').post(UserController.uploadResume);
// router.route('/DeleteResume').delete(UserController.deleteResume);
// router.route('/GetResume').get(UserController.getResume);
// router.route('/GetAllResumes').get(UserController.getAllResumes);


// TO TEST USER DATASE WITH RANDOM USERS
router.route('/GenerateUserTestData').post(UserController.generateTestUsers);

module.exports = router;
