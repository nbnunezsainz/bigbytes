const express = require('express');
const router = express.Router();

//const AuthenticationController = require('../controllers/Authentication')
const MentorController = require('../controllers/Mentors');
const AuthenticationController = require("../controllers/Authentication");

// AUTHENTICATION ROUTES
router.route('/MentorDetails').post(AuthenticationController.IsMentor,AuthenticationController.verifyToken, AuthenticationController.CreateDetailsAboutMentor);

// Mentor routes
router.route('/AddMentor').post(MentorController.addMentor);

router.route('/QueryMentors').get( MentorController.queryMentors);
router.route('/GetAllMentors').get(MentorController.getAllMentors);

router.route('/DeleteMentor').delete(AuthenticationController.verifyToken, AuthenticationController.IsMentor, MentorController.deleteMentor);

router.route('/GetMentor').get(AuthenticationController.verifyToken, AuthenticationController.IsMentor,MentorController.getMentor);

router.route('/GetMentorProfile').get(AuthenticationController.verifyToken,AuthenticationController.IsMentor ,MentorController.getMentorProfile);

router.route('/UpdateMentor').patch(AuthenticationController.verifyToken, AuthenticationController.IsMentor,MentorController.updateMentor);
// router.route('/GenerateInternship').post(AuthenticationController.IsMentor, MentorController.generateInternship);
router.route('/RequestedReferals').get(AuthenticationController.verifyToken,AuthenticationController.IsMentor, MentorController.CheckReferals);

router.route('/UpdateRefStatus').patch(AuthenticationController.verifyToken, MentorController.UpdateReferalStatus);

// TO TEST USER DATASE WITH RANDOM MENTORS
//router.route('/GenerateMentorTestData').post(MentorController.generateTestMentors);

module.exports = router;
