const express = require('express');

const router = express.Router();
const authBAL = require('../bal/authBAL');

router.get('/generateCaptchaAndSalt/:type/:length', authBAL.generateCaptchaAndSalt);
router.post('/signIn', authBAL.signIn);
router.get('/getUserDetails/:role/:username', authBAL.getUserDetails);
router.post('/signOut', authBAL.signOut);

module.exports = router;