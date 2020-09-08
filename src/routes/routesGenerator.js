const home = require('./home');
const reset = require('./reset');

const routesGenerator = (app) => {
  app.use(reset);
  app.use(home);
};

module.exports = routesGenerator;
