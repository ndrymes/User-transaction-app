const bodyParser = require('body-parser');
const { getAccountBalance } = require('../controllers/account');

module.exports.setup = function setup(server) {
  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  server.use(bodyParser.json());

  server.get({
    path: '/',
    name: 'app health check',
    version: '1.0.0',
  }, (req, res) => res.send('Welcome to the Test API Service'));

  server.get({
    path: '/account/balance/:accountId',
    name: 'Get vehicle data',
    version: '1.0.0',
  }, (req, res) => getAccountBalance(req, res));
};
