const express = require('express');

const router = express.Router();
const homeBAL = require('../bal/homeBAL');

router.get('/getDistricts', homeBAL.getDistricts);
router.get('/getBlocks/:districtCode', homeBAL.getBlocks);
router.get('/getGPs/:blockCode', homeBAL.getGPs);
router.get('/getVillages/:gpCode', homeBAL.getVillages);
router.get('/getFarmerAddress/:villageCode', homeBAL.getFarmerAddress);
router.get('/getImplementDetails', homeBAL.getImplementDetails);
router.post('/submitFarmerBooking', homeBAL.submitFarmerBooking);
router.get('/checkProprietorEmailIDAvailability/:proprietorEmailID', homeBAL.checkProprietorEmailIDAvailability);
router.get('/checkUniqueFarmIDAvailability/:uniqueFarmID', homeBAL.checkUniqueFarmIDAvailability);
router.post('/submitManufacturerDetails', homeBAL.submitManufacturerDetails);

module.exports = router;