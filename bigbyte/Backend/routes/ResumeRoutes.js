const express = require('express');
const router = express.Router();


const AuthenticationController = require('../controllers/Authentication');
const ResumeController = require('../controllers/Resume');

router.route('/UploadResume').post(ResumeController.uploadResume);
router.route('/DeleteResume').delete(ResumeController.deleteResume);
router.route('/GetResume').get(ResumeController.getResume);
router.route('/GetAllResumes').get(ResumeController.getAllResumes);
router.route('/GetAllResumesAndComments').get(ResumeController.getAllResumesWithComments);

module.exports = router;