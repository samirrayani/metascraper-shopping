'use strict'

const urlParser = require('url');

const toPriceFormat = (price) => {
  if(typeof price === 'string') {
    price = price.replace(/\$/g,'').replace(/,/g,'');
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