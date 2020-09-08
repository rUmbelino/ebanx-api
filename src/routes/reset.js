const { Router } = require('express');
const Storage = require('../models/Storage');

const router = Router();

router.post('/reset', (req, res) => {
  Storage.reset();
  res.send();
});

module.exports = router;
