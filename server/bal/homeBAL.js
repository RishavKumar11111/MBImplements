const ip = require('ip');
const UAParser = require('ua-parser-js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

exports.checkProprietorEmailIDAvailability = async (req, res) => {
  try {
    const result = await homeDAL.checkProprietorEmailIDAvailability(req.params);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.checkUniqueFarmIDAvailability = async (req, res) => {
  try {
    const result = await homeDAL.checkUniqueFarmIDAvailability(req.params);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './public/temporary');
  },
  filename(req, file, callback) {
    const data = JSON.parse(req.body.data);
    callback(null, `${data.UniqueFarmID}-${file.fieldname}-${Date.now()}${path.extname(file.originalname).toLowerCase()}`);
  }
});

const fileFilter = (req, file, callback) => {
  try {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extension = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extension) {
      if (mimeType) {
        callback(null, true);
      } else {
        callback(new Error(`The Image file is tampered with. Please upload a valid Image file.`));
      }
    } else {
      callback(new Error(`The files must be in PDF or JPEG / JPG / PNG format.`));
    }
  } catch {
    callback(new Error(`Oop! An error occurred. Please try again.`));
  }
};

const limits = {
  fileSize: 1000000,
  files: 5
};

const upload = multer({
  storage, limits, fileFilter
});

const fileUpload = upload.fields([
  {
    name: 'DICMSMERegistrationCertificate', maxCount: 1
  },
  {
    name: 'UdyogAadhaar', maxCount: 1
  },
  {
    name: 'BSIRegistrationCertificate', maxCount: 1
  },
  {
    name: 'OAICOSICOFMRDCRegistrationConsent', maxCount: 1
  },
  {
    name: 'ManufacturingUnitPhoto', maxCount: 1
  }
]);

exports.submitManufacturerDetails = async (req, res) => {
  try {
    fileUpload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log(`${err}: Oops! An error occurred. Please contact the administrator.`);
      } else if (err) {
        console.log(`${err}: Oops! An error occurred. Please try after sometime.`);
      } else if (req.files === undefined) {
        console.log(`Please select a file.`);
      } else {
        const data = JSON.parse(req.body.data);
        if (data.Captcha === req.session.captcha) {
          const files = {
            ...req.files
          };
          const url = `${req.protocol}://${req.get('host')}`;
          const obj = {
            ManufacturerEmailID: data.ManufacturerEmailID,
            ManufacturerName: data.ManufacturerName,
            ManufacturerMobileNo: data.ManufacturerMobileNo,
            ManufacturerAadhaarNo: null,
            DistrictCode: data.DistrictCode,
            BlockCode: data.BlockCode,
            ManufacturerAddress: data.ManufacturerAddress,
            FarmName: data.FarmName,
            UniqueFarmID: data.UniqueFarmID,
            GSTINNo: data.GSTINNo,
            PANNo: data.PANNo,
            DICMSMERegistrationCertificate: files.DICMSMERegistrationCertificate[0].path.replace('public', url).replace(/\\/g, '/').replace('temporary', 'manufacturer-documents'),
            UdyogAadhaar: files.UdyogAadhaar[0].path.replace('public', url).replace(/\\/g, '/').replace('temporary', 'manufacturer-documents'),
            BSIRegistrationCertificate: files.BSIRegistrationCertificate[0].path.replace('public', url).replace(/\\/g, '/').replace('temporary', 'manufacturer-documents'),
            OAICOSICOFMRDCRegistrationConsent: files.OAICOSICOFMRDCRegistrationConsent[0].path.replace('public', url).replace(/\\/g, '/').replace('temporary', 'manufacturer-documents'),
            ManufacturingUnitPhoto: files.ManufacturingUnitPhoto[0].path.replace('public', url).replace(/\\/g, '/').replace('temporary', 'manufacturer-documents'),
            FinancialYear: getFinancialYear(),
            DateTime: 'now()',
            IPAddress: ip.address(),
            Status: null,
            RejectionReason: null
          };
          const result = await homeDAL.submitManufacturerDetails(obj);
          homeDAL.addActivityLog('/submitManufacturerDetails', 'INSERT', 'POST', null, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
          const temporaryPath = './public/temporary';
          const manufacturerDocumentPath = './public/Manufacturer-documents';
          fs.readdir(temporaryPath, (err1, files1) => {
            if (err1) {
              console.log(`Unable to scan directory: ${err1}`);
            }
            files1.forEach((file) => {
              if ('UniqueFarmID' in result[0]) {
                if (file.substring(0, 3) === result[0].UniqueFarmID) {
                  fs.rename(path.join(temporaryPath, file), path.join(manufacturerDocumentPath, file), (err2) => {
                    if (err2) {
                      console.log(`Unable to move files in directory: ${err2}`);
                    }
                  });
                }
              } else if (file.substring(0, 3) === data.UniqueFarmID) {
                fs.unlink(path.join(temporaryPath, file), (err2) => {
                  if (err2) {
                    console.log(`Unable to delete directory: ${err2}`);
                  }
                });
              }
            });
          });
          res.send(result);
        } else {
          res.send({
            message: 'Invalid Captcha.'
          });
        }
      }
    });
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};