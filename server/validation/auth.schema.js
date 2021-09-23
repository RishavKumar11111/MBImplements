const Joi = require('joi');

const schemas = {
  authSchema: Joi.object().keys({
    UserID: Joi.string().min(2).max(50).regex(/^([\w]+|(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/, 'User ID')
      .required(),
    Password: Joi.string().min(1).max(50).required(),
    Captcha: Joi.number().min(1).max(3).required()
  })
};

module.exports = schemas;