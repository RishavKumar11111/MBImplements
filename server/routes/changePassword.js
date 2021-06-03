const express = require('express');

const router = express.Router();

/* GET changePassword page. */
router.get('/', (req, res, next) => {
  res.send('changePassword');
});

module.exports = router;