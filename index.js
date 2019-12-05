'use strict'

const { $jsonld } = require('@metascraper/helpers')

/**
 * A set of rules we want to declare under `metascraper-price` namespace.
 *
**/
module.exports = () => {
  const rules = {
    price: [
      $jsonld('offers.price'),
      $jsonld('0.offers.price'),
      ({ htmlDom: $, url }) => $('[itemprop=price]').attr('content'),
      ({ htmlDom: $, url }) => $('[property="og:price:amount"]').attr('content'),
      ({ htmlDom: $, url }) => $('[property="product:price:amount"]').attr('content'),
      ({ htmlDom: $, url }) => $('[itemprop=price]').html()
    ]
  }
  return rules
}