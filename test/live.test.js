'use strict'

const got = require('got');
const metascraper = require('metascraper')([require('..')()])

test.skip('live test', async () => {
	const targetUrl = 'https://www.article.com/product/2525/beacon-copper-floor-lamp';
	const { body: html, url } = await got(targetUrl, {
		'headers': {
			'user-agent': 'googlebot'
		}
	});

	const metadata = await metascraper({ html, url });
	console.log(metadata);
	expect(metadata.currency).toBe('USD');

}, 10000);