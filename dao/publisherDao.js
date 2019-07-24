var db = require('./db');

exports.getAllPublishers = function (cb) {
	db.query('select * from lms_simple.publisher', function (error, result) {
		cb(error, result);
	});
};

exports.addPublisher = function (publisher, cb) {
	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		db.query('insert into lms_simple.publisher(publisher_name) values(?)', [publisher.publisherName], function (err, res) {
			if (err) {
				db.rollback(function (err, res) {
					cb(err, res);
				});
			}
			db.commit(function (err, res) {
				cb(err, res);
			});
		});
	});
};

exports.updatePublisher = function (publisher, cb) {
	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		if (publisher.publisherName != null && publisher.publisherName.length > 0) {
			db.query('update publisher set publisher_name = ? where publisher_id = ?', [publisher.publisherName, publisher.publisherId], function (err, res) {
				if (err) {
					db.rollback(function (err, res) {
						cb(err, res);
					});
				}
				db.commit(function (err, res) {
					cb(err, res);
				});
			});
		}
	});
};

exports.removePublisher = function (publisherId, cb) {
	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		db.query('delete from lms_simple.publisher where publisher_id = ?', [publisherId], function (err, res) {
			if (err) {
				db.rollback(function (err, res) {
					cb(err, res);
				});
			}
			db.commit(function (err, res) {
				cb(err, res);
			});
		});
	});
};