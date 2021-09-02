"use strict";

const { $jsonld, memoizeOne } = require("@metascraper/helpers");
const { toPriceFormat, getHostname } = require("./helpers");

const jsonLdGraph = memoizeOne(($) => {
  return JSON.parse($('script[type="application/ld+json"]').html());
});

const jsonLdProduct = memoizeOne(($) => {
  const jsonld = jsonLdGraph($);

  if (jsonld && jsonld["@graph"]) {
    let products = jsonld["@graph"].filter((i) => {
      return i["@type"] === "Product";
    });
    return products.length > 0 ? products[0] : null;
  }
  return;
});

const jsonLdLastBreadcrumb = memoizeOne(($) => {
  const jsonld = jsonLdGraph($);
  if (jsonld && jsonld["@graph"]) {
    let breadcrumbs = jsonld["@graph"].filter((i) => {
      return i["@type"] === "BreadcrumbList";
    });
    let breadcrumb = breadcrumbs.length > 0 && breadcrumbs[0];
    let items = breadcrumb.itemListElement;
    let item = items[items.length - 1];
    return item;
  }

  return null;
});

/**
 * A set of rules we want to declare under the `metascraper-shopping` namespace.
 *
 **/
module.exports = () => {
  const rules = {
    name: [
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLdLastBreadcrumb($);
        return jsonld && jsonld.name;
      },
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLdProduct($);
        return jsonld && jsonld.name;
      },
    ],
    image: [
      ({ htmlDom: $, url }) => $('a[data-fancybox="images"]').attr("href"), //fireclaytile.com
      ({ htmlDom: $, url }) =>
        $('div.ImageComponent img[data-codeception-id="ImageComponent"]').attr(
          "src"
        ), //wayfair.com
      ({ htmlDom: $, url }) => $("img#comparison_image").attr("data-src"), //amazon.com
    ],
    currency: [
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLdProduct($);
        return jsonld && jsonld.offers && jsonld.offers.priceCurrency;
      },
      ({ htmlDom: $, url }) =>
        $('[property="og:price:currency"]').attr("content"),
      ({ htmlDom: $, url }) => $jsonld("offers.0.priceCurrency")($, url),
      ({ htmlDom: $, url }) => $jsonld("offers.priceCurrency")($, url),
      ({ htmlDom: $, url }) =>
        $("[data-asin-currency-code]").attr("data-asin-currency-code"), //amazon
      ({ htmlDom: $, url }) =>
        $('[property="product:price:currency"]').attr("content"),
      ({ htmlDom: $, url }) => $("[itemprop=priceCurrency]").attr("content"),
    ],
    condition: [
      ({ htmlDom: $, url }) => $jsonld("itemCondition")($, url),
      ({ htmlDom: $, url }) => $jsonld("offers.itemCondition")($, url),
      ({ htmlDom: $, url }) => $jsonld("offers.0.itemCondition")($, url),
    ],
    sku: [
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLdProduct($);
        return jsonld && jsonld.sku;
      },
      ({ htmlDom: $, url }) => $jsonld("sku")($, url),
      ({ htmlDom: $, url }) => $jsonld("offers.sku")($, url),
      ({ htmlDom: $, url }) => $jsonld("offers.0.sku")($, url),
      ({ htmlDom: $, url }) => $("[itemprop=sku]").html(),
    ],
    mpn: [
      //mpn=ManufacturProductNumber
      ({ htmlDom: $, url }) => $jsonld("mpn")($, url),
      ({ htmlDom: $, url }) => $jsonld("offers.mpn")($, url),
      ({ htmlDom: $, url }) => $jsonld("offers.0.mpn")($, url),
    ],
    availability: [
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLdProduct($);
        return jsonld && jsonld.offers && jsonld.offers.availability;
      },
      ({ htmlDom: $, url }) =>
        $('[property="og:availability"]').attr("content"),
      ({ htmlDom: $, url }) => $jsonld("offers.availability")($, url),
      ({ htmlDom: $, url }) => $jsonld("offers.0.availability")($, url),
    ],
    price: [
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLdProduct($);
        return jsonld && jsonld.offers && toPriceFormat(jsonld.offers.price);
      },
      ({ htmlDom: $, url }) =>
        toPriceFormat($('[property="og:price:amount"]').attr("content")),
      ({ htmlDom: $, url }) =>
        toPriceFormat($("[itemprop=price]").attr("content")),
      ({ htmlDom: $, url }) =>
        toPriceFormat($('[property="product:price:amount"]').attr("content")),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld("price")($, url)),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld("offers.price")($, url)),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld("0.offers.price")($, url)),
      ({ htmlDom: $, url }) =>
        toPriceFormat($jsonld("offers.lowPrice")($, url)),
      ({ htmlDom: $, url }) =>
        toPriceFormat($jsonld("offers.highPrice")($, url)),
      ({ htmlDom: $, url }) =>
        toPriceFormat($("[data-asin-price]").attr("data-asin-price")), //amazon
      ({ htmlDom: $, url }) => toPriceFormat($("[itemprop=price]").html()),
      ({ htmlDom: $, url }) =>
        toPriceFormat(
          toPriceFormat($("#attach-base-product-price").attr("value"))
        ),
    ],
    asin: [
      //unique amazon identifier
      ({ htmlDom: $, url }) => $("[data-asin]").attr("data-asin"),
    ],
    hostname: [({ htmlDom: $, url }) => getHostname(url)],
    retailer: [
      ({ htmlDom: $, url }) => $('[property="og:site_name"]').attr("content"),
    ],
  };
  return rules;
};
