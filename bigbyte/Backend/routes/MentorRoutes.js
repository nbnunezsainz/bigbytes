const express = require('express');
const router = express.Router();

const AuthenticationController = require('../controllers/Authentication')
const MentorController = require('../controllers/Mentors');


// Mentor routes
router.post('/addMentor', MentorController.addMentor);
router.get('/getMentor/:mentorID', MentorController.getMentor);
router.delete('/deleteMentor/:mentorID', MentorController.deleteMentor);
router.post('/queryMentors', MentorController.queryMentors);

module.exports = router;
