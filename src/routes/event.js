const { Router } = require('express');

const {
  STATUS_ERROR,
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  MESSAGE_NOT_FOUND,
} = require('./constants');
const Account = require('../models/Account');

const router = Router();

router.post('/event', (req, res) => {
  try {
    const { type } = req.body;

    if (type === 'deposit') {
      const { id, balance } = Account.deposit(req.body);
      res.status(STATUS_CREATED).send({
        destination: { id, balance },
      });
      return;
    }

    res.status(STATUS_NOT_FOUND).send(MESSAGE_NOT_FOUND);
  } catch ({ message }) {
    res.status(STATUS_ERROR).send({ message });
  }
});

module.exports = router;
