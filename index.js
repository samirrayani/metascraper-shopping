'use strict'

const formatPrice = (price) => {
  return parseFloat(price.replace('$',''));
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
      formatPrice(({ htmlDom: $, url }) => $('[itemprop=price]').attr('content')),
      formatPrice(({ htmlDom: $, url }) => $('[property="og:price:amount"]').attr('content')),
      formatPrice(({ htmlDom: $, url }) => $('[property="product:price:amount"]').attr('content')),
      formatPrice(({ htmlDom: $, url }) => $('[itemprop=price]').html())
    ]
  }
  return rules
}