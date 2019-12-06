'use strict'

const { $jsonld } = require('@metascraper/helpers')

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
      ({ htmlDom: $, url }) => $jsonld('price')($,url),
      ({ htmlDom: $, url }) => $jsonld('offers.price')($,url),
      ({ htmlDom: $, url }) => $jsonld('0.offers.price')($,url),
      ({ htmlDom: $, url }) => $('[property="og:price:amount"]').attr('content'),
      ({ htmlDom: $, url }) => $('[itemprop=price]').attr('content'), 
      ({ htmlDom: $, url }) => $('[property="product:price:amount"]').attr('content'),
      ({ htmlDom: $, url }) => $('[itemprop=price]').html()
    ]
  }
  return rules
}