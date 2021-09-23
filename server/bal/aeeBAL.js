const ip = require('ip');
const UAParser = require('ua-parser-js');
const aeeDAL = require('../dal/aeeDAL');

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

exports.getManufacturerStockSerialNos = async (req, res) => {
  try {
    const result = await aeeDAL.getManufacturerStockSerialNos(req.session.userID);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.approveRejectStockSerialNos = async (req, res) => {
  try {
    const array = [];
    for (let i = 0; i < req.body.array.length; i++) {
      array.push(Object.values({
        ImplementID: req.body.array[i].ImplementID,
        StockSerialNo: req.body.array[i].StockSerialNo,
        MSEFinancialYear: req.body.array[i].MSEFinancialYear,
        ManufacturerUserID: req.body.array[i].ManufacturerUserID,
        Status: req.body.obj.Status,
        AEEPDIFinancialYear: getFinancialYear(),
        AEEPDIDateTime: 'now',
        AEEIPAddress: ip.address(),
        AEEUserID: req.session.userID,
        RejectionReason: req.body.obj.RejectionReason
      }));
    }
    console.log(array);
    const result = await aeeDAL.approveRejectStockSerialNos(array);
    aeeDAL.addActivityLog('/approveRejectStockSerialNos', 'UPDATE', 'POST', req.session.userID, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};