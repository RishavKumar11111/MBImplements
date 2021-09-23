const Joi = require('joi');

const schemas = {
  farmerBookingSchema: Joi.object().keys({
    FarmerID: Joi.string().min(5).max(11).regex(/^[A-Z]{1,3}\/[1-9][0-9]{0,6}$/, 'Farmer ID')
      .required(),
    FarmerName: Joi.string().min(1).max(50).regex(/^[a-zA-Z\s]+$/, 'Farmer Name')
      .required(),
    FarmerMobileNo: Joi.string().min(10).max(10).regex(/^[6-9][0-9]{9}$/, 'Farmer Mobile No.')
      .required(),
    FarmerCategory: Joi.string().regex(/General|SC|ST/, 'Farmer Category').required(),
    DistrictCode: Joi.number().min(3).max(3).required(),
    BlockCode: Joi.number().min(4).max(4).required(),
    GPCode: Joi.number().min(6).max(6).required(),
    VillageCode: Joi.number().min(6).max(6).required(),
    ImplementID: Joi.number().min(1).max(3).required(),
    Captcha: Joi.number().min(1).max(3).required()
  }),
  manufacturerRegistrationSchema: Joi.object().keys({
    ManufacturerEmailID: Joi.string().min(6).max(50).required(),
    ManufacturerName: Joi.string().min(1).max(50).required(),
    ManufacturerMobileNo: Joi.string().min(10).max(10).required(),
    DistrictCode: Joi.number().min(3).max(3).required(),
    BlockCode: Joi.number().min(4).max(4).required(),
    ManufacturerAddress: Joi.string().min(1).max(300).required(),
    FarmName: Joi.string().min(1).max(50).required(),
    UniqueFarmID: Joi.string().min(3).max(3).required(),
    GSTINNo: Joi.string().min(15).max(15).required(),
    PANNo: Joi.string().min(10).max(10).required(),
    Captcha: Joi.number().min(1).max(3).required()
  })
};

module.exports = schemas;