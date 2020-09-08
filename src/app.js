const express = require('express');
const routesGenerator = require('./routes/routesGenerator');

const app = express();

app.use(express.json());
routesGenerator(app);

module.exports = app;
