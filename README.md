# metascraper-price

[![npm](https://img.shields.io/npm/v/@samirrayani/metascraper-price.svg?style=flat-square)](https://www.npmjs.com/package/@samirrayani/metascraper-price)
[![Dependency Status](https://david-dm.org/samirrayani/metascraper-price.svg?style=flat-square)](https://david-dm.org/samirrayani/metascraper-price)

> A custom rule bundle for [@microlinkhq/metascraper](https://github.com/microlinkhq/metascraper) to get product information from HTML markup on merchant websites

## Install

```bash
$ npm install @samirrayani/metascraper-price --save
```

## Usage

```javascript
'use strict'

const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-image')(),
  require('metascraper-url')(),
  require('@samirrayani/metascraper-price')()
]);
const got = require('got');

const targetUrl = '<an URL from any e-commerce website>';
const { body: html, url } = await got(targetUrl);
const metadata = await metascraper({ html, url });
console.log(metadata);
/*
metadata: {
  title:        [String]
  image:        [String]
  url:          [String]
  price:        [Float|null]
  currency:     [String]
  condition:    [String]
  sku:          [String]
  mpn:          [String]
  availability: [String]
}
*/
```

## License

**@samirrayani/metascraper-price** © 2019 Samir Rayani, Released under the [MIT](https://github.com/samirrayani/metascraper-price/blob/master/LICENSE.md) License.
