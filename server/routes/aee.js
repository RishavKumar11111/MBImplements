const express = require('express');

const router = express.Router();
const aeeBAL = require('../bal/aeeBAL');

router.get('/getManufacturerStockSerialNos', aeeBAL.getManufacturerStockSerialNos);
router.post('/approveRejectStockSerialNos', aeeBAL.approveRejectStockSerialNos);

module.exports = router;