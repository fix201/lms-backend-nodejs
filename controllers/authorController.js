var routes = require('express').Router();
var authorDao = require('../dao/authorDao');

routes.get('/author', function (req, res) {
	authorDao.getAllAuthors(function (error, result) {
		if (error) throw error;
		res.setHeader('Content-Type', 'application/json');
		res.send(result);
	});
});

routes.post('/author', function (req, res) {
	var author = req.body;
	authorDao.addAuthor(author, function (err, result) {
		if (err) {
			res.status(400);
			res.send('[-] Add Author Failed!');
		}
		res.status(201);
		res.send('[+] ' + author.firstName + 'Add Author Successful!');
	});
});

routes.patch('/author/:id', function (req, res) {
	var author = req.body;
	if (req.params.id != null) {
		authorDao.updateAuthor(author, function (err, result) {
			if (err) {
				res.status(400);
				res.send('[-] Update Author Failed!');
			}
			res.status(201);
			res.send('[+] Update Author Successful!');
		});
	}
});


routes.delete('/author/:id', function (req, res) {
	authorDao.removeAuthor(req.params.id, function (err, result) {
		if (err) {
			res.status(400);
			res.send('[-] Delete Author Failed!');
		}
		res.send('[+] Delete Author Successful!');
	});
});

module.exports = routes;