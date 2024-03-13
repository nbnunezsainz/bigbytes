const express = require('express');
const router = express.Router();


const AuthenticationController = require('../controllers/Authentication');
const ResumeController = require('../controllers/Resume');

router.route('/UploadResume').post( AuthenticationController.IsStudent, AuthenticationController.verifyToken, ResumeController.uploadResume);
router.route('/DeleteResume').delete(AuthenticationController.IsStudent, ResumeController.deleteResume);
router.route('/GetResume').get(ResumeController.getResume);
router.route('/GetAllResumes').get(ResumeController.getAllResumes);
router.route('/GetAllResumesWithComments').get(ResumeController.getAllResumesWithComments);
router.route('/CommentOnResume').post(ResumeController.commentOnAResume);
router.route('/resumeToAllComments').get(ResumeController.connectResumeToAllComments);

module.exports = router;