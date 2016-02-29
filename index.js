'use strict';

const app = require('./server');
const scraper = require('./scraper');

app.get('/search/:query', (req, res) => {
	let params = req.params;

	scraper.search(params['query'], (error, links) => {
		if (error) {
			res.status(500).send(error.toString());
		} else {
			res
				.status(200)
				.set('content-type', 'application/json')
				.send(JSON.stringify(links, null, 4));
		}
	});
});