const ip = require('ip');
const UAParser = require('ua-parser-js');
const manufacturerDAL = require('../dal/manufacturerDAL');

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

exports.getAllImplements = async (req, res) => {
  try {
    const financialYear = getFinancialYear();
    const result = await manufacturerDAL.getAllImplements(financialYear);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getUniqueFarmIDYear = async (req, res) => {
  try {
    const result = await manufacturerDAL.getUniqueFarmID(req.session.userID);
    result.push({
      Year: `${new Date().getFullYear()}`
    });
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getStockSerialNos = async (req, res) => {
  try {
    const result = await manufacturerDAL.getStockSerialNos(req.params, getFinancialYear(), req.session.userID);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.submitStockSerialNos = async (req, res) => {
  try {
    const array1 = [];
    for (let i = 0; i < req.body.StockSerialNos.length; i++) {
      const obj = {
        ImplementID: req.body.ImplementID,
        StockSerialNo: req.body.StockSerialNos[i].StockSerialNo,
        PreferredSupplier: req.body.PreferredSupplier,
        MSEFinancialYear: getFinancialYear(),
        MSEDateTime: 'now()',
        ManufacturerIPAddress: ip.address(),
        ManufacturerUserID: req.session.userID
      };
      array1.push(Object.values(obj));
    }
    const result = await manufacturerDAL.submitStockSerialNos(array1, req.body.StockSerialNos);
    manufacturerDAL.addActivityLog('/submitStockSerialNos', 'INSERT', 'POST', req.session.userID, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};