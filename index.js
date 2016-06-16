var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 5000;
var domain = process.env.PORT ? 'port: ' : 'http://localhost:';

allowCors = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Methods', 'DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
}

app.use(allowCors);

function User(user) {
  this.name = user.name;
}

app.get('/', function (req, res) {
  res.send('Hello! The API is at ' + domain + port + '/api');
});

app.get('/setup', function(req, res) {
  // create a sample user
  var nick = new User({
    name: 'Nick Cerminara',
    password: 'password',
    admin: true
  });

  // save the sample user
  console.log('User saved successfully');
  res.json({
    success: true,
    user: nick.name
  });
  console.log(nick);
});


// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, function () {
  console.log('Magic happens at ' + domain + port);
});
