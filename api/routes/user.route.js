var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var mysql = require('../config/mysql');

// Retrieve all users 
router.get('/', function (req, res) {
    mysql.query("SELECT users.*, users.status AS statusId, CASE WHEN title = 1 THEN 'Mr.' WHEN title = 2 THEN 'Mrs.' WHEN title = 3 THEN 'Miss.' WHEN title = 4 THEN 'Dr.' ELSE '' END AS title, CASE WHEN status = 1 THEN 'Active' WHEN status = 2 THEN 'Inactive' WHEN status = 0 THEN 'Draft' WHEN status=3 THEN 'Blocked' WHEN status = 4 THEN 'Pending' ELSE '' END AS status FROM users", function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});


// Retrieve user with id 
router.get('/:id', function (req, res) {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }

    let sql = "SELECT users.*, users.title as titleId, users.status AS statusId, CASE WHEN title = 1 THEN 'Mr.' WHEN title = 2 THEN 'Mrs.' WHEN title = 3 THEN 'Miss.' WHEN title = 4 THEN 'Dr.' ELSE '' END AS title, CASE WHEN status = 1 THEN 'Active' WHEN status = 2 THEN 'Inactive' WHEN status = 0 THEN 'Draft' WHEN status=3 THEN 'Blocked' WHEN status = 4 THEN 'Pending' ELSE '' END AS status FROM users where id=? LIMIT 1";

    mysql.query(sql, id, function (error, results, fields) {
        if (error) throw error;
        if (typeof results[0] != 'undefined'){
            return res.send(results[0]);
        } else{
            return res.send(results);
        }
    });

});


// Add a new user  
router.post('/', function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    var userObj = {
        title: req.body.title,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        phone: '',
        status: req.body.status,
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


//  Update user with id
router.put('/:id', function (req, res) {
    let id = req.params.id;
    let user = req.body.user;
    
    // if (!id || !user) {
    if (!id) {
        return res.status(400).send({ error: user, message: 'Please provide user and id' });
    }

    var userObj = {
        title: req.body.title,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        status: req.body.status,
        phone: req.body.phone
    };

    mysql.query("UPDATE users SET ? WHERE id = ?", [userObj, id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, message: 'user has been updated successfully.' });
    });
});


//  Delete user
router.delete('/:id', function (req, res) {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }
    mysql.query('DELETE FROM users WHERE id = ?', [id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, message: 'User has been updated successfully.' });
    });
});

module.exports = router;