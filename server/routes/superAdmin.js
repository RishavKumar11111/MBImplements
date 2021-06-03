const express = require('express');

const router = express.Router();

/* GET superAdmin page. */
router.get('/', (req, res, next) => {
  res.send('superAdmin');
});

module.exports = router;