const express = require('express');
const router = express.Router();

//const AuthenticationController = require('../controllers/Authentication');
const InternshipController = require('../controllers/Internships');

// Internship routes
router.route('/AddInternship').post(InternshipController.addInternship);
router.route('/QueryInternships').get(InternshipController.queryInternships);
router.route('/DeleteInternship').delete(InternshipController.deleteInternship);
router.route('/GetInternship').get(InternshipController.getInternship);

module.exports = router;
