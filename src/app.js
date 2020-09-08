const express = require('express');
const routesGenerator = require('./routes/routesGenerator');

const app = express();

routesGenerator(app);

module.exports = app;
