const { Router } = require('express');

const {
  STATUS_ERROR,
  STATUS_NOT_FOUND,
  MESSAGE_NOT_FOUND,
} = require('./constants');
const Account = require('../models/Account');

const router = Router();
const BALANCE = '/balance';

router.get(`${BALANCE}/:account_id`, (req, res) => {
  try {
    const [, account_id] = req.params.account_id.split('=');
    const account = Account.findById(account_id);

    if (!account) {
      return res.status(STATUS_NOT_FOUND).send(MESSAGE_NOT_FOUND);
    }

    res.send(account.balance);
  } catch ({ message }) {
    res.status(STATUS_ERROR).send({ message });
  }
});

module.exports = router;
