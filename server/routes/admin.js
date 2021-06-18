const express = require('express');

const router = express.Router();
const adminBAL = require('../bal/adminBAL');

router.get('/getAllImplements', adminBAL.getAllImplements);
router.get('/getFinancialYear', adminBAL.getFinancialYear);
router.get('/getImplementTargets/:implementID/:financialYear', adminBAL.getImplementTargets);
router.post('/submitImplementTarget', adminBAL.submitImplementTarget);
router.post('/updateImplementTarget', adminBAL.updateImplementTarget);
router.get('/getAllImplementPrices', adminBAL.getAllImplementPrices);
router.post('/submitImplementPrice', adminBAL.submitImplementPrice);
router.post('/updateImplementPrice', adminBAL.updateImplementPrice);
router.post('/submitActivatedImplements', adminBAL.submitActivatedImplements);

module.exports = router;