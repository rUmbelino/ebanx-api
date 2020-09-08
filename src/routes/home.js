const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.send(`API version: ${process.env.npm_package_version}`);
});

module.exports = router;
