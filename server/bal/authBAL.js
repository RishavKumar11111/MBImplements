const ip = require('ip');
const UAParser = require('ua-parser-js');
const crypto = require('crypto');
const sha512 = require('js-sha512');
const authDAL = require('../dal/authDAL');

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

const generateRandomNumber = () => {
  const buf = crypto.randomBytes(16);
  return buf.toString('hex');
};

exports.generateCaptchaAndSalt = (req, res) => {
  let code = '';
  try {
    switch (req.params.type) {
      case '1': {
        const char = Math.random().toString(24).substring(2, req.params.length) + Math.random().toString(24).substring(2, 4);
        req.session.captcha = char.toUpperCase();
        code = char.toUpperCase();
        break;
      }
      case '2': {
        // const num = Math.floor(Math.random() * (max - min + 1)) + min; // Returns an integer random number between min (included) and max (included)
        const num1 = Math.floor(Math.random() * 90) + 10;
        const num2 = Math.floor(Math.random() * 10);
        const operators = ['+', '-'];
        const operator = operators[(Math.floor(Math.random() * operators.length))];
        code = `${num1 + operator + num2}=?`;
        req.session.captcha = (operator === '+') ? (num1 + num2) : (num1 - num2);
        break;
      }
      default: {
        // nothing happens here
      }
    }
    req.session.salt = !req.session.salt ? generateRandomNumber() : req.session.salt;
    res.send({
      code, resultCode: req.session.captcha, salt: req.session.salt
    });
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.signIn = async (req, res) => {
  try {
    if (req.body.captcha === req.session.captcha) {
      const result = await authDAL.getUserDetails(req.body.userID);
      if (result.length > 0) {
        if (sha512(result[0].PasswordHash + req.session.salt) === req.body.password) {
          req.session.role = result[0].RoleName;
          req.session.userID = req.body.userID;
          req.session.username = result[0].Username;
          req.session.cookie.maxAge = 1800000;
          const tempSession = req.session;
          req.session.regenerate((err) => {
            Object.assign(req.session, tempSession);
          });
          authDAL.addActivityLog('/signIn', 'SELECT', 'POST', req.session.userID, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
          req.session.save((err) => {
            // const cookieOption = {
            //   path: '/',
            //   httpOnly: false,
            //   secure: 'auto',
            //   sameSite: true,
            //   maxAge: 1800000,
            //   signed: true
            // };
            // res.cookie('auth.cookie', req.session.username + req.session.role, cookieOption);
            res.send({
              username: req.session.username, role: req.session.role, message: true
            });
          });
        } else {
          res.send({
            message: 'Invalid Username or Password.'
          });
        }
      } else {
        res.send({
          message: 'Invalid Username or Password.'
        });
      }
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

exports.getUserDetails = (req, res) => {
  try {
    if (req.session.username === req.params.username && req.session.role === req.params.role) {
      res.send({
        isLoggedIn: true
      });
    } else {
      req.session.destroy();
      res.send({
        isLoggedIn: false
      });
    }
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.signOut = (req, res) => {
  try {
    req.session.destroy();
    res.send({
      message: true
    });
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};