const ip = require('ip');
const UAParser = require('ua-parser-js');
const homeDAL = require('../dal/homeDAL');

const parser = new UAParser();

exports.getDistricts = async (req, res) => {
  try {
    const result = await homeDAL.getDistricts();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getBlocks = async (req, res) => {
  try {
    const result = await homeDAL.getBlocks(req.params);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getGPs = async (req, res) => {
  try {
    const result = await homeDAL.getGPs(req.params);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getVillages = async (req, res) => {
  try {
    const result = await homeDAL.getVillages(req.params);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getFarmerAddress = async (req, res) => {
  try {
    const result = await homeDAL.getFarmerAddress(req.params);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

const getFinancialYear = () => {
  const today = new Date();
  const financialYear = (today.getMonth() + 1) <= 3 ? `${today.getFullYear() - 1}-${today.getFullYear().toString().substr(2, 3)}` : `${today.getFullYear()}-${(today.getFullYear() + 1).toString().substr(2, 3)}`;
  return financialYear;
};

exports.getImplementDetails = async (req, res) => {
  try {
    const financialYear = getFinancialYear();
    const result = await homeDAL.getImplementDetails(financialYear);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

const getURL = (req) => {
  const fullURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  return fullURL;
};

exports.submitFarmerBooking = async (req, res) => {
  try {
    if (req.body.Captcha === req.session.captcha) {
      const obj = {
        PartReferenceNo: `MBD/${req.body.DistrictCode}/${getFinancialYear().substring(2, 7)}/`,
        FarmerID: req.body.FarmerID,
        FarmerName: req.body.FarmerName,
        FarmerMobileNo: req.body.FarmerMobileNo,
        DistrictCode: req.body.DistrictCode,
        BlockCode: req.body.BlockCode,
        GPCode: req.body.GPCode,
        VillageCode: req.body.VillageCode,
        ImplementID: req.body.ImplementID,
        FinancialYear: getFinancialYear(),
        DateTime: 'now()',
        IPAddress: ip.address(),
        Status: null
      };
      const result = await homeDAL.submitFarmerBooking(obj);
      homeDAL.addActivityLog('/submitFarmerBooking', 'INSERT', 'POST', null, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
      res.send(result);
    } else {
      res.send({
        message: 'Invalid Captcha.'
      });
    }
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};