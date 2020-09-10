const { Router } = require('express');

const Storage = require('../models/Storage');
const { MESSAGE_OK } = require('../utils/constants');

const router = Router();

router.post('/reset', (req, res) => {
  Storage.reset();
  res.send(MESSAGE_OK);
});

module.exports = router;
