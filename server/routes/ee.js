const express = require('express');

const router = express.Router();
const eeBAL = require('../bal/eeBAL');

router.get('/getEEDistricts', eeBAL.getEEDistricts);
router.get('/getImplementStockDetails/:districtCode', eeBAL.getImplementStockDetails);
router.post('/submitStockAvailability', eeBAL.submitStockAvailability);
router.get('/getBlocks/:districtCode', eeBAL.getBlocks);
router.get('/getImplementsStockSerialNos/:districtCode', eeBAL.getImplementsStockSerialNos);
router.post('/submitStockInitialisation', eeBAL.submitStockInitialisation);

module.exports = router;