const express = require('express');

const router = express.Router();
const adminBAL = require('../bal/adminBAL');

router.get('/getAllImplements', adminBAL.getAllImplements);
router.get('/getFinancialYear', adminBAL.getFinancialYear);
router.get('/getDistrictTargets/:implementID/:financialYear', adminBAL.getDistrictTargets);
router.post('/submitDistrictTarget', adminBAL.submitDistrictTarget);
router.post('/updateDistrictTarget', adminBAL.updateDistrictTarget);
router.get('/getAllImplementPrices', adminBAL.getAllImplementPrices);
router.post('/submitImplementPrice', adminBAL.submitImplementPrice);
router.post('/updateImplementPrice', adminBAL.updateImplementPrice);

module.exports = router;