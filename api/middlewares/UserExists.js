var mysql = require('../config/mysql');

function checkUserExists(req, res, next) {
    mysql.query('SELECT 1 FROM users where status=1 AND id=?', req.user_id, function (error, results, fields) {
        if (error) throw error;
        var user = results[0];
        if (user == null) {
            return res.status(500).send({ auth: false, message: 'User does not exists!' });
        }

        next();
    });
    /*
    User.findOne({ status: 1, _id: req.user_id }, function(err, user) {
        if (err) {
            console.log(err);
            if (!user) return res.status(404).send('No user found.');
        } else {
            if (user == null) {
                return res.status(500).send({ auth: false, message: 'User does not exists!' });
            }

            next();
        }
    });*/
}

module.exports = checkUserExists;