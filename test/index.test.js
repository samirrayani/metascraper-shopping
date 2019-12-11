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
  const url = 'https://www.overstock.com/Home-Garden/Certified-International-Elegance-Canape-Plates-Set-of-6/29099468/product.html?refccid=LDNVKF2XQ7MKQP2LE3VXMUYALU&searchidx=0&guid=f4adad64-034d-46b2-92dc-e956d094d3ea&osp=true&option=51668490&kwds=&rfmt='
  const metadata = await metascraper({ url, html })
  expect(metadata.price).toBe(31.49);
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

test('potterybarn.com no longer available', async () => {
  const html = await readFile(resolve(__dirname, 'fixtures/potterybarn.html'))
  const url = 'https://www.potterybarn.com/products/tully-brass-sconce/'
  const metadata = await metascraper({ url, html })
  expect(metadata.price).toBeFalsy();
});

test('rejuvenation.com item on sale', async () => {
  const html = await readFile(resolve(__dirname, 'fixtures/rejuvenation.html'))
  const url = 'https://www.rejuvenation.com/catalog/collections/keystick-wall-sconce/products/5c50a4d2ccf2f73ea295b9e1'
  const metadata = await metascraper({ url, html })
  expect(metadata.price).toBe(120.00);
});

test('amazon.com asin price', async () => {
  const html = await readFile(resolve(__dirname, 'fixtures/amazon.html'))
  const url = 'https://www.amazon.com/Lighting-Fixture-Plaster-Conservatory-Dimmable/dp/B07G2L3JMM'
  const metadata = await metascraper({ url, html })
  expect(metadata.price).toBe(29.99);
});

test('globalindustrial.com NaN', async () => {
  const html = await readFile(resolve(__dirname, 'fixtures/globalindustrial.html'))
  const url = 'https://www.globalindustrial.com/p/work-benches/components/tops/60-x-24-maple-square-edge-bench-top'
  const metadata = await metascraper({ url, html })
  expect(metadata.price).toBeFalsy();
});