const express = require('express');
const router = express.Router();

const AuthenticationController = require('../controllers/Authentication');
const InternshipController = require('../controllers/Internships');
const UserController = require('../controllers/Users');

// Internship routes
router.route('/AddInternship').post(AuthenticationController.IsStudent, AuthenticationController.verifyToken, InternshipController.addInternship);
router.route('/GetAllInternships').get(AuthenticationController.verifyToken, InternshipController.getAllInternships);
router.route('/QueryInternships').get(AuthenticationController.verifyToken, InternshipController.queryInternships);
router.route('/DeleteInternship').delete(AuthenticationController.IsMentor,AuthenticationController.verifyToken, InternshipController.deleteInternship);
router.route('/GetInternship').get(InternshipController.getInternship);
router.route('/RequestReferal').get(AuthenticationController.IsStudent,AuthenticationController.verifyToken, UserController.getUserAndResume, InternshipController.requestReferal);

// TO TEST USER DATASE WITH RANDOM MENTORS
//router.route('/GenerateInternshipTestData').post(InternshipController.generateTestInternsip);

module.exports = router;
