var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var userRoute = require('./routes/user.route');
var AuthRoute = require('./auth/AuthController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', userRoute);
app.use('/auth', AuthRoute);

// set port
app.listen(3000, function () {
    console.log('Node Express is running on port 3000');
});

module.exports = app;