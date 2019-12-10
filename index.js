'use strict'

const { $jsonld } = require('@metascraper/helpers')

const toPriceFormat = (price) => {
  if(typeof price === 'string') {
    price = price.replace(/\$/g,'').replace(/,/g,'');
  }
  return isNaN(price) ? undefined : +parseFloat(price).toFixed(2);
}

/**
 * A set of rules we want to declare under `metascraper-price` namespace.
 *
**/
module.exports = () => {
  const rules = {
    price: [
      // They receive as parameter:
      // - `htmlDom`: the cheerio HTML instance.
      // - `url`: The input URL used for extact the content.
      ({ htmlDom: $, url }) => toPriceFormat($('[property="og:price:amount"]').attr('content')),
      ({ htmlDom: $, url }) => toPriceFormat($('[itemprop=price]').attr('content')), 
      ({ htmlDom: $, url }) => toPriceFormat($('[property="product:price:amount"]').attr('content')),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld('price')($,url)),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld('offers.price')($,url)),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld('0.offers.price')($,url)),
      ({ htmlDom: $, url }) => toPriceFormat($('[itemprop=price]').html())
    ]
  }
  return rules
}
