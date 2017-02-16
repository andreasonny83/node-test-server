var router = require('express').Router();
var four0four = require('./utils/404')();
var pkginfo = require('pkginfo')(module);

var appName = module.exports.name;
var appVersion = module.exports.version;

/**
 * CORS support
 * Customize that according to your client app requirements
 */
router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/', home);
router.get('/status', status);

router.get('/directory/healthCheck', healthCheck);

router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

function status(req, res) {
  const data = {
    app: appName,
    version: appVersion,
    status: 200,
    message: 'OK - ' + Math.random().toString(36).substr(3, 8)
  };

  res.status(200).send(data);
}

function home(req, res) {
  res.status(200).send('Hello there!');
}

function healthCheck(req, res) {
  res.status(204).send();
}
