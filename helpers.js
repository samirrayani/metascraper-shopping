'use strict'

const urlParser = require('url');

const toPriceFormat = (price) => {
  if(typeof price === 'string') {
    // remove all non-numeric characters and symbols like $, € and others others.
    // except for '.' and ','
    price = price.replace(/[^\d\.\,]/g,'');

    price = /^(\d+\.?){1}(\.\d{2,3})*\,\d{1,2}$/.test(price)
      ? price.replace(/\./g,'').replace(',', '.') // case 1: price is formatted as '12.345,67'
      : price.replace(/,/g,''); // case 2: price is formatted as '12,345.67'
  }

  return ~~Number(price)>0 ? +parseFloat(price).toFixed(2) : undefined;
}

const getHostname = (url) => {
  return urlParser.parse(url).hostname.replace('www.', '');
}

module.exports = {
    toPriceFormat,
    getHostname
};