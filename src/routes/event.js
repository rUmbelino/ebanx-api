const { Router } = require('express');

const { STATUS_ERROR } = require('./constants');
const eventHandler = require('../controller/event');

const router = Router();

router.post('/event', (req, res) => {
  try {
    const { status, message } = eventHandler(req.body);
    res.status(status).send(message);
  } catch ({ message }) {
    res.status(STATUS_ERROR).send({ message });
  }
});

module.exports = router;
