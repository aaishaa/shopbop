'use strict';

const async = require('async');
const request = require('request');
const cheerio = require('cheerio');

const search = (query, callback) => {
	async.waterfall([
		function (next) {
			request({
				url: 'https://www.shopbop.com/actions/viewSearchResultsAction.action',
				qs: {
					searchButton: 'Submit',
					query: query,
					searchSuggestion: false
				}
			}, (error, response, body) => {
				next(error, body);
			});
		},
		function (body, next) {
			try {
				let $ = cheerio.load(body);

				let links = [];

				async.each($('.product a.photo'), (ele, next_element) => {
					let link = $(ele).attr('href');
					
					links.push(`https://www.shopbop.com${link}`);
					next_element();
				}, (error) => {
					next(error, links)
				});
			} catch (error) {
				next(error);
			}
		}
	], function (error, links) {
		callback(error, links);
	})
};

const Scraper = {
	search: search
};

module.exports = Scraper;