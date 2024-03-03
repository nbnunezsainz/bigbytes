const express = require('express');
const router = express.Router();

//const AuthenticationController = require('../controllers/Authentication');
const InternShipController = require('../controllers/Internships');

router.route('/AddInternship').post(InternShipController.addInternship);
router.route('/QueryInternship').post(InternShipController.queryInternships);
router.route('/DeleteInternship').post(InternShipController.deleteInternship);
router.route('/GetInternship').post(InternShipController.getInternship);

//.delete(InternShipController.deleteInternship);
//router.route('/Internship/:?').post(InternShipController.getInternship );
// router.route('/SignOut').post(AuthenticationController.login ,AuthenticationController.RedirectToStorePage);
// router.route('/DeleteAccount').post(AuthenticationController.login ,AuthenticationController.RedirectToStorePage);
module.exports = router;

//User can send request here for SignUp/login and then be redicrected accordingly
//check mate?