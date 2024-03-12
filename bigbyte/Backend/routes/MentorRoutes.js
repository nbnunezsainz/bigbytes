const express = require('express');
const router = express.Router();

//const AuthenticationController = require('../controllers/Authentication')
const MentorController = require('../controllers/Mentors');
const AuthenticationController = require("../controllers/Authentication");

// Mentor routes
router.route('/AddMentor').post(MentorController.addMentor);
router.route('/QueryMentors').get(AuthenticationController.verifyToken, MentorController.queryMentors);
router.route('/GetAllMentors').get(AuthenticationController.verifyToken, MentorController.getAllMentors);
router.route('/DeleteMentor').delete(MentorController.deleteMentor);
router.route('/GetMentor').get(AuthenticationController.verifyToken, MentorController.getMentor);
router.route('/GetMentorProfile').get(AuthenticationController.verifyToken, MentorController.getMentorProfile);
router.route('/UpdateMentor').patch(AuthenticationController.verifyToken, MentorController.updateMentor);
router.route('/GenerateInternship').post(MentorController.generateInternship);
router.route('/RequestedReferals').get(AuthenticationController.verifyToken, MentorController.CheckReferals);

router.route('/UpdateRefStatus').patch(AuthenticationController.verifyToken, MentorController.UpdateReferalStatus); 

// TO TEST USER DATASE WITH RANDOM MENTORS
//router.route('/GenerateMentorTestData').post(MentorController.generateTestMentors);

module.exports = router;
