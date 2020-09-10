const { Router } = require('express');

const Account = require('../models/Account');
const {
  STATUS_ERROR,
  STATUS_NOT_FOUND,
  MESSAGE_NOT_FOUND,
} = require('../utils/constants');

const router = Router();

router.get('/balance', (req, res) => {
  try {
    const { account_id } = req.query;

    const account = Account.findById(account_id);

    if (!account) {
      return res.status(STATUS_NOT_FOUND).send(MESSAGE_NOT_FOUND);
    }

    res.send(String(account.balance));
  } catch ({ message }) {
    res.status(STATUS_ERROR).send({ message });
  }
});

module.exports = router;
