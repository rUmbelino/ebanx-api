const home = require('./home');

const routesGenerator = (app) => {
  app.use(home);
};

module.exports = routesGenerator;
