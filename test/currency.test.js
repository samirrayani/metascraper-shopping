'use strict'

const metascraper = require('metascraper')([require('..')()])

test('returns open graph value (og:price:currency)', async () => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title></title>
      <meta property="og:price:currency" content="USD">
      <meta itemprop="currency" content="EUR">
    </head>
    <body>
    </body>
    </html>
    `
  const url = 'https://www.strukbuilt.com/';
  const metadata = await metascraper({ html, url });
  expect(metadata.currency).toBe('USD');
});