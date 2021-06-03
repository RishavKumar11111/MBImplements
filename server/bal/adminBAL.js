const ip = require('ip');
const UAParser = require('ua-parser-js');
const adminDAL = require('../dal/adminDAL');

const parser = new UAParser();

exports.getAllImplements = async (req, res) => {
  try {
    const result = await adminDAL.getAllImplements();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getFinancialYear = (req, res) => {
  const today = new Date();
  const previousFinancialYear = (today.getMonth() + 1) <= 3 ? `${today.getFullYear() - 2}-${(today.getFullYear() - 1).toString().substr(2, 3)}` : `${today.getFullYear() - 1}-${today.getFullYear().toString().substr(2, 3)}`;
  const financialYear = (today.getMonth() + 1) <= 3 ? `${today.getFullYear() - 1}-${today.getFullYear().toString().substr(2, 3)}` : `${today.getFullYear()}-${(today.getFullYear() + 1).toString().substr(2, 3)}`;
  const nextFinancialYear = (today.getMonth() + 1) <= 3 ? `${today.getFullYear()}-${(today.getFullYear() + 1).toString().substr(2, 3)}` : `${today.getFullYear() + 1}-${(today.getFullYear() + 2).toString().substr(2, 3)}`;
  const years = [];
  years.push(previousFinancialYear, financialYear, nextFinancialYear);
  res.send(years);
};

exports.getDistrictTargets = async (req, res) => {
  try {
    const result = await adminDAL.getDistrictTargets(req.params);
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

exports.submitDistrictTarget = async (req, res) => {
  try {
    const array = [];
    for (let i = 0; i < req.body.length; i++) {
      req.body[i].IPAddress = ip.address();
      req.body[i].UserID = req.session.userID;
      req.body[i].DateTime = 'now()';
      array.push(Object.values(req.body[i]));
    }
    const result = await adminDAL.submitDistrictTarget(array);
    adminDAL.addActivityLog('/submitDistrictTarget', 'INSERT', 'POST', req.session.userID, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.updateDistrictTarget = async (req, res) => {
  try {
    const array = [];
    for (let i = 0; i < req.body.length; i++) {
      req.body[i].IPAddress = ip.address();
      req.body[i].UserID = req.session.userID;
      req.body[i].DateTime = 'now()';
      array.push(Object.values(req.body[i]));
    }
    const result = await adminDAL.updateDistrictTarget(array);
    adminDAL.addActivityLog('/updateDistrictTarget', 'UPDATE', 'POST', req.session.userID, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getAllImplementPrices = async (req, res) => {
  try {
    const result = await adminDAL.getAllImplementPrices();
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

exports.submitImplementPrice = async (req, res) => {
  try {
    const obj = {
      ImplementID: req.body.selectedImplement.ImplementID,
      Cost: req.body.enteredPrice,
      DateTime: 'now()',
      IPAddress: ip.address(),
      FinancialYear: getFinancialYear(),
      UserID: req.session.userID
    };
    const result = await adminDAL.submitImplementPrice(obj);
    adminDAL.addActivityLog('/submitImplementPrice', 'UPDATE', 'POST', req.session.userID, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.updateImplementPrice = async (req, res) => {
  try {
    const obj = {
      ImplementID: req.body.selectedImplement.ImplementID,
      Cost: req.body.enteredPrice,
      DateTime: 'now()',
      IPAddress: ip.address(),
      FinancialYear: getFinancialYear(),
      UserID: req.session.userID
    };
    const result = await adminDAL.updateImplementPrice(obj);
    adminDAL.addActivityLog('/updateImplementPrice', 'UPDATE', 'POST', req.session.userID, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};