'use strict'

const { readFile } = require('fs').promises
const { resolve } = require('path')
const metascraper = require('metascraper')([require('..')()])

test('returns open graph value (og:price:amount)', async () => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title></title>
      <meta property="og:price:amount" content="$100,000,000.00">
      <meta itemprop="price" content="itemprop value">
    </head>
    <body>
    </body>
    </html>
    `
  const url = 'https://www.strukbuilt.com/';
  const metadata = await metascraper({ html, url });
  expect(metadata.price).toBe(100000000.00);
});

test('price with commas', async () => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title></title>
      <meta property="og:price:amount" content="$$2,699.00">
    </head>
    <body>
    </body>
    </html>
    `
  const url = 'https://www.strukbuilt.com/';
  const metadata = await metascraper({ html, url });
  expect(metadata.price).toBe(2699.00);
});

test('overstock.com ld+json', async () => {
  const html = await readFile(resolve(__dirname, 'fixtures/overstock.html'))
  const url = 'https://www.overstock.com/Lighting-Ceiling-Fans/Luxury-Modern-Track-Lighting-10.5-H-x-44.5-W-with-Spa-Style-Polished-Chrome-Finish/19478614/product.html'
  const metadata = await metascraper({ url, html })
  expect(metadata.price).toBe(269.99);
});

test('jossandmain.com ld+json', async () => {
  const html = await readFile(resolve(__dirname, 'fixtures/jossandmain.html'))
  const url = 'https://www.jossandmain.com/lighting/pdp/duprey-4-light-lantern-pendant-j001109161.html'
  const metadata = await metascraper({ url, html })
  expect(metadata.price).toBe(98.99);
});

test('costco.com product:price:amount', async () => {
  const html = await readFile(resolve(__dirname, 'fixtures/costco.html'))
  const url = 'https://www.costco.com/afa-stainless-33-inch-sink-and-semi-pro-faucet-combo.product.100432602.html'
  const metadata = await metascraper({ url, html })
  expect(metadata.price).toBe(329.99);
});