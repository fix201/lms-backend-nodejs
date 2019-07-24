var db = require('./db');

exports.getAllAuthors = function (cb) {
	db.query('select * from lms_simple.author', function (error, result) {
		cb(error, result);
	});
};

exports.addAuthor = function (author, cb) {
	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		db.query('insert into lms_simple.author(first_name, last_name) values(?, ?)', [author.firstName, author.lastName], function (err, res) {
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

exports.updateAuthor = function (author, cb) {
	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		if (author.firstName != null && author.firstName.length > 0 && author.lastName != null && author.lastName.length > 0) {
			db.query('update author set first_name = ?, last_name = ? where author_id = ?', [author.firstName, author.lastName, author.authorId], function (err, res) {
				if (err) {
					db.rollback(function (err, res) {
						cb(err, res);
					});
				}
				db.commit(function (err, res) {
					cb(err, res);
				});
			});
		} else if((author.firstName == null || author.firstName.length == 0) && author.lastName != null && author.lastName.length > 0){
			db.query('update author set last_name = ? where author_id = ?', [author.lastName, author.authorId], function (err, res) {
				if (err) {
					db.rollback(function (err, res) {
						cb(err, res);
					});
				}
				db.commit(function (err, res) {
					cb(err, res);
				});
			});
		} else if(author.firstName != null && author.firstName.length > 0 && (author.lastName == null || author.lastName.length == 0)){
			db.query('update author set first_name = ? where author_id = ?', [author.firstName, author.authorId], function (err, res) {
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

exports.removeAuthor = function (authorId, cb) {
	db.beginTransaction(function (err) {
		if (err) cb(err, null);
		db.query('delete from lms_simple.author where author_id = ?', [authorId], function (err, res) {
			if (err) {
				console.log(err);
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