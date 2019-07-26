var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'cloudlmsdb.c1xejlrearuh.us-east-1.rds.amazonaws.com',
	user:'root',
	password:'password',
	database:'lms_simple',
	multipleStatements: true
});

module.exports = connection;
