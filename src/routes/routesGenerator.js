const home = require('./home');
const reset = require('./reset');
const balance = require('./balance');

const routesGenerator = (app) => {
  app.use(reset);
  app.use(home);
  app.use(balance);
};

module.exports = routesGenerator;
