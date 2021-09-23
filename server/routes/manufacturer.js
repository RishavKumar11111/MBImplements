const express = require('express');

const router = express.Router();
const manufacturerBAL = require('../bal/manufacturerBAL');

router.get('/getAllImplements', manufacturerBAL.getAllImplements);
router.get('/getUniqueFarmIDYear', manufacturerBAL.getUniqueFarmIDYear);
router.get('/getStockSerialNos/:implementID', manufacturerBAL.getStockSerialNos);
router.post('/submitStockSerialNos', manufacturerBAL.submitStockSerialNos);

module.exports = router;