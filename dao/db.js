var mysql = require('mysql');

var connection = mysql.createConnection({
	host: '127.0.0.1',
	user:'root',
	password:'password',
	database:'lms_simple'
});

module.exports = connection;