'use strict'

const got = require('got');
const metascraper = require('metascraper')([require('..')()])

test('live test', async () => {
	const targetUrl = 'https://www.wayfair.com/Maykke--Dewey-59.06-x-31.5-Freestanding-Soaking-Bathtub-XDA1408001-L590-K~MYKK1019.html?refid=GX99081569362-MYKK1019&device=c&ptid=327664668846&network=g&targetid=pla-327664668846&channel=GooglePLA&ireid=54397045&fdid=1817';
	const { body: html, url } = await got(targetUrl, {
		'headers': {
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0'
		}
	});

	const metadata = await metascraper({ html, url });
	expect(metadata.hostname).toBe('wayfair.com');

}, 10000);