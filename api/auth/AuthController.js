var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var mysql = require('../config/mysql');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/secret');
var VerifyToken = require('../middlewares/VerifyToken');
var checkUserExists = require('../middlewares/UserExists');

router.post('/login', function(req, res) {
    mysql.query('SELECT * FROM users where status=1 AND email=?', req.body.email, function (error, results, fields) {
        if (error) throw error;

        var user = results[0];
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(200).send({ success: false, msg: "Invalid/Email Password", auth: false, token: null });

        // if user is found and password is valid create a token
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        return res.status(200).send({ success: true, msg: "Login Successful", auth: true, token: token, id: user.id, title: user.title, first_name: user.first_name, last_name: user.last_name, email: user.email, phone: user.phone });
    });
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

router.post('/register', function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    var userObj = {
        title: req.body.title,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        status: 1,
        created_at: new Date()
    };

    mysql.query("INSERT INTO users SET ? ", userObj, function (error, results, fields) {
        if (error) {
            console.log('error');
            throw error;
        }
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});

router.get('/me', VerifyToken, checkUserExists, function(req, res) {
    res.status(200).send('A vaild user with valid JWT');
});

module.exports = router;