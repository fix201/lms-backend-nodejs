var routes = require('express').Router();
var bookDao = require('../dao/bookDao');

routes.get('/book', function (req, res) {
	bookDao.getAllbooks(function (error, result) {
		if (error) throw error;
		res.setHeader('Content-Type', 'application/json');
		res.send(result);
	});
});

routes.post('/book', function (req, res) {
	var book = req.body;
	bookDao.addBook(book, function (error) {
		if (error) {
			res.status(400);
			res.send('[-] Add Book Failed!');
		}
		res.status(201);
		res.send('[+] Add Book Successful!');
	});
});

routes.patch('/book/:id', function (req, res) {
	var book = req.body;
	if (book.bookId != null) {
		bookDao.updateBook(book, function (err) {
			if (err) {
				res.status(400);
				res.send('[-] Update Book Failed!');
			}
			res.status(201);
			res.send('[+] Update Book Successful!');
		});
	}
});

routes.delete('/book/:id', function (req, res) {
	bookDao.removeBook(req.params.id, function (err, result) {
		if (err) {
			res.status(400);
			res.send('[-] Delete Book Failed!');
		}
		res.send('[+] Delete Book Successful!');
	});
});


module.exports = routes;