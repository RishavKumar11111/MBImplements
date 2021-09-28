const ip = require('ip');
const UAParser = require('ua-parser-js');
const eeDAL = require('../dal/eeDAL');

const parser = new UAParser();

const getFinancialYear = () => {
  const today = new Date();
  const financialYear = (today.getMonth() + 1) <= 3 ? `${today.getFullYear() - 1}-${today.getFullYear().toString().substr(2, 3)}` : `${today.getFullYear()}-${(today.getFullYear() + 1).toString().substr(2, 3)}`;
  return financialYear;
};

const getURL = (req) => {
  const fullURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  return fullURL;
};

exports.getEEDistricts = async (req, res) => {
  try {
    const result = await eeDAL.getEEDistricts(req.session.userID);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getImplementStockDetails = async (req, res) => {
  try {
    const financialYear = getFinancialYear();
    const result = await eeDAL.getImplementStockDetails(req.params, req.session.userID, financialYear);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.submitStockAvailability = async (req, res) => {
  try {
    const array = [];
    for (let i = 0; i < req.body.implementStockDetails.length; i++) {
      let slNo = 1;
      let modifiedSlNo = '';
      for (let j = 0; j < req.body.implementStockDetails[i].EnteredAvailableSurplusStocks; j++) {
        if (slNo >= 1 && slNo <= 9) {
          modifiedSlNo = `000${slNo++}`;
        } else if (slNo >= 10 && slNo <= 99) {
          modifiedSlNo = `00${slNo++}`;
        } else if (slNo >= 100 && slNo <= 999) {
          modifiedSlNo = `0${slNo++}`;
        } else if (slNo >= 1000 && slNo <= 9999) {
          modifiedSlNo = slNo++;
        }
        const obj = {
          DistrictCode: req.body.district.DistrictCode,
          ImplementID: req.body.implementStockDetails[i].ImplementID,
          StockSerialNo: `${req.body.district.DistrictName}/${modifiedSlNo}/${new Date().getFullYear()}`,
          Status: 0,
          FinancialYear: getFinancialYear(),
          AvailabilityDateTime: 'now()',
          IPAddress: ip.address(),
          UserID: req.session.userID
        };
        array.push(Object.values(obj));
      }
    }
    const result = await eeDAL.submitStockAvailability(array);
    eeDAL.addActivityLog('/submitStockAvailability', 'INSERT', 'POST', req.session.userID, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getBlocks = async (req, res) => {
  try {
    const result = await eeDAL.getBlocks(req.params);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getImplementsStockSerialNos = async (req, res) => {
  try {
    const result = await eeDAL.getImplementsStockSerialNos(req.params, req.session.userID);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.submitStockInitialisation = async (req, res) => {
  try {
    const array = [];
    const obj = {
      DistrictCode: req.body.DistrictCode,
      BlockCode: req.body.BlockCode,
      InitialisationDateTime: 'now()',
      UserID: req.session.userID
    };
    for (let i = 0; i < req.body.StocksSerialNos.length; i++) {
      array.push(Object.values(req.body.StocksSerialNos[i]));
    }
    const result = await eeDAL.submitStockInitialisation(obj, array);
    eeDAL.addActivityLog('/submitStockAvailability', 'INSERT', 'POST', req.session.userID, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getStockSupplyData = async (req, res) => {
  try {
    const result = await eeDAL.getStockSupplyData(req.params, req.session.userID);
    console.log(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getAllImplements = async (req, res) => {
  try {
    const financialYear = getFinancialYear();
    const result = await eeDAL.getAllImplements(financialYear);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};