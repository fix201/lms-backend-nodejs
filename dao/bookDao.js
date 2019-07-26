var db = require('./db');

exports.getAllBooks = function (cb) {
	db.query('select book_id, title, first_name, last_name, publisher_name from lms_simple.book book ' +
		'join lms_simple.publisher publisher on book.publisher_id = publisher.publisher_id ' +
		'join lms_simple.author author on book.author_id = author.author_id',
		function (err, res) {
			cb(err, res);
		});
};

exports.addBook = function (book, cb) {

	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		db.query('INSERT INTO lms_simple.publisher (publisher_name) VALUES(?);' +
			'INSERT INTO lms_simple.author (last_name, first_name) VALUES(?, ?);' +
			'Insert Into lms_simple.book (title, author_id, publisher_id) ' +
			'values (?,(select max(author_id) from  lms_simple.author),(select max(publisher_id) from lms_simple.publisher));',
			[book.publisherName, book.lastName, book.firstName, book.title], function (err, res) {
				if (err) {
					db.rollback(function (err, res) {
						console.log('err: ' + err)
						cb(err, res);
					});
				}
				db.commit(function (err, res) {
					cb(err, res);
				});
			});
	});
};

exports.updateBook = function (book, cb) {
	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		if (book.title != null && book.title.length > 0) {
			db.query('update book set title = ? where book_id = ?', [book.title, book.bookId], function (err, res) {
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

exports.removeBook = function (bookId, cb) {
	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		db.query('delete from lms_simple.book where book_id = ?', [bookId], function (err, res) {
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