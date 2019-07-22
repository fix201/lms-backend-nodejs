var db = require('./db');

exports.getAllBooks = function (cb) {
	db.query('select * from lms_simple.book', function (err, res) {
		cb(err, res);
	});
};

exports.addBook = function (book, cb) {
	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		db.query('insert into lms_simple.book(title, author_id, publisher_id) values(?, ?, ?)', [book.title, book.author.authorId, book.publisher.publisherId], function (err, res) {
			if(err) {
				db.rollback(function(err, res){
					cb(err, res);
				});
			}
			db.commit(function(err, res){
				cb(err, res);
			});
		});
	});
};

exports.updateBook = function (book, cb) {
	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		db.query('update book set title = ? where book_id = ?', [book.title, book.bookId], function (err, res) {
			if(err) {
				db.rollback(function(err, res){
					cb(err, res);
				});
			}
			db.commit(function(err, res){
				cb(err, res);
			});
		});
	});
};

exports.removeBook = function (bookId, cb) {
	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		db.query('delete from lms_simple.book where book_id = ?', [bookId], function (err, res) {
			if(err) {
				db.rollback(function(err, res){
					cb(err, res);
				});
			}
			db.commit(function(err, res){
				cb(err, res);
			});
		});
	});
};