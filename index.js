'use strict'

const { $jsonld } = require('@metascraper/helpers')
const { toPriceFormat, getHostname } = require('./helpers');

/**
 * A set of rules we want to declare under the `metascraper-shopping` namespace.
 *
**/
module.exports = () => {
  const rules = {
    image: [
      ({ htmlDom: $, url }) => $('div.ImageComponent img[data-codeception-id="ImageComponent"]').attr('src'), //wayfair.com
      ({ htmlDom: $, url }) => $('img#comparison_image').attr('src'), //amazon.com      
    ],
    currency: [
      ({ htmlDom: $, url }) => $('[property="og:price:currency"]').attr('content'),
      ({ htmlDom: $, url }) => $jsonld('offers.0.priceCurrency')($,url),
      ({ htmlDom: $, url }) => $jsonld('offers.priceCurrency')($,url),
      ({ htmlDom: $, url }) => $('[data-asin-currency-code]').attr('data-asin-currency-code'), //amazon
      ({ htmlDom: $, url }) => $('[property="product:price:currency"]').attr('content'),
    ],
    condition: [
      ({ htmlDom: $, url }) => $jsonld('itemCondition')($,url),
      ({ htmlDom: $, url }) => $jsonld('offers.itemCondition')($,url),
      ({ htmlDom: $, url }) => $jsonld('offers.0.itemCondition')($,url),
    ],
    sku: [
      ({ htmlDom: $, url }) => $jsonld('sku')($,url),
      ({ htmlDom: $, url }) => $jsonld('offers.sku')($,url),
      ({ htmlDom: $, url }) => $jsonld('offers.0.sku')($,url),
      ({ htmlDom: $, url }) => $('[itemprop=sku]').html(), 
    ],
    mpn: [ //mpn=ManufacturProductNumber
      ({ htmlDom: $, url }) => $jsonld('mpn')($,url),
      ({ htmlDom: $, url }) => $jsonld('offers.mpn')($,url),
      ({ htmlDom: $, url }) => $jsonld('offers.0.mpn')($,url),
    ],
    availability: [
      ({ htmlDom: $, url }) => $('[property="og:availability"]').attr('content'),
      ({ htmlDom: $, url }) => $jsonld('offers.availability')($,url),
      ({ htmlDom: $, url }) => $jsonld('offers.0.availability')($,url),
    ],
    price: [
      ({ htmlDom: $, url }) => toPriceFormat($('[property="og:price:amount"]').attr('content')),
      ({ htmlDom: $, url }) => toPriceFormat($('[itemprop=price]').attr('content')), 
      ({ htmlDom: $, url }) => toPriceFormat($('[property="product:price:amount"]').attr('content')),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld('price')($,url)),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld('offers.price')($,url)),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld('0.offers.price')($,url)),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld('offers.lowPrice')($,url)),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld('offers.highPrice')($,url)),
      ({ htmlDom: $, url }) => toPriceFormat($('[data-asin-price]').attr('data-asin-price')), //amazon
      ({ htmlDom: $, url }) => toPriceFormat($('[itemprop=price]').html())
    ],
    asin: [ //unique amazon identifier
      ({ htmlDom: $, url }) => $('[data-asin]').attr('data-asin'),
    ],
    hostname: [
      ({ htmlDom: $, url }) => getHostname(url),
    ]
  }
  return rules
}
