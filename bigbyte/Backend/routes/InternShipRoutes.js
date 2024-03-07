const express = require('express');
const router = express.Router();

const AuthenticationController = require('../controllers/Authentication');
const InternshipController = require('../controllers/Internships');

// Internship routes
router.route('/AddInternship').post(InternshipController.addInternship);
router.route('/GetAllInternships').get(AuthenticationController.verifyToken, InternshipController.getAllInternships);
router.route('/QueryInternships').get(AuthenticationController.verifyToken, InternshipController.queryInternships);
router.route('/DeleteInternship').delete(InternshipController.deleteInternship);
router.route('/GetInternship').get(InternshipController.getInternship);

// TO TEST USER DATASE WITH RANDOM MENTORS
router.route('/GenerateInternshipTestData').post(InternshipController.generateTestInternsip);

module.exports = router;
