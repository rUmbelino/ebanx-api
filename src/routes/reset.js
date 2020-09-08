const { Router } = require('express');

const { MESSAGE_OK } = require('./constants');
const Storage = require('../models/Storage');

const router = Router();

router.post('/reset', (req, res) => {
  Storage.reset();
  res.send(MESSAGE_OK);
});

module.exports = router;
