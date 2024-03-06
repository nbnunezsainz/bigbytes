const express = require('express');
const router = express.Router();

//const AuthenticationController = require('../controllers/Authentication')
const MentorController = require('../controllers/Mentors');

// Mentor routes
router.route('/AddMentor').post(MentorController.addMentor);
router.route('/QueryMentors').get(MentorController.queryMentors);
router.route('/GetAllMentors').get(MentorController.getAllMentors);
router.route('/DeleteMentor').delete(MentorController.deleteMentor);
router.route('/GetMentor').get(MentorController.getMentor);
router.route('/GenerateInternship').post(MentorController.generateInternship);

module.exports = router;
