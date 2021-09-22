"use strict";

const { $jsonld, memoizeOne } = require("@metascraper/helpers");
const { toPriceFormat, getHostname } = require("./helpers");

const jsonLd = memoizeOne(($) => {
  const jsonld = JSON.parse($('script[type="application/ld+json"]').html());
  return jsonld;
});

const jsonLdGraph = memoizeOne(($) => {
  const jsonld = JSON.parse($('script[type="application/ld+json"]').html());
  return jsonld && jsonld["@graph"];
});

//@graph { @type=Product }
const jsonLdGraphProduct = memoizeOne(($) => {
  const jsonld = jsonLdGraph($);

  if (jsonld) {
    let products = jsonld.filter((i) => {
      return i["@type"] === "Product";
    });
    return products.length > 0 ? products[0] : null;
  }
  return;
});

const jsonLdLastBreadcrumb = memoizeOne(($) => {
  const jsonld = jsonLdGraph($);
  if (jsonld) {
    let breadcrumbs = jsonld.filter((i) => {
      return i["@type"] === "BreadcrumbList";
    });
    let breadcrumb = breadcrumbs.length > 0 && breadcrumbs[0];
    let items = breadcrumb.itemListElement;
    if (items && items.length > 0) {
      let item = items[items.length - 1];
      return item;
    }

    return null;
  }

  return null;
});

/**
 * A set of rules we want to declare under the `metascraper-shopping` namespace.
 *
 **/
module.exports = () => {
  const rules = {
    brand: [
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLd($);
        let brand = jsonld && jsonld.brand;
        if (brand && brand.name) {
          brand = brand.name;
        }
        return brand;
      },
    ],
    name: [
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLd($);

        return jsonld && jsonld.name;
      },
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLdLastBreadcrumb($);
        return jsonld && jsonld.name;
      },
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLdGraphProduct($);
        return jsonld && jsonld.name;
      },
      ({ htmlDom: $, url }) => $('[property="og:title"]').attr("content"),
    ],
    url: [
      ({ htmlDom: $, url }) => {
        // dacor.com canonical points to homepage
        if (url.includes("dacor.com")) {
          return url;
        }
      },
    ],
    image: [
      ({ htmlDom: $, url }) => $('a[data-fancybox="images"]').attr("href"), //fireclaytile.com
      ({ htmlDom: $, url }) => $("div#imgTagWrapperId img").attr("src"), //amazon.com
      ({ htmlDom: $, url }) => {
        //arizontile
        let relativeImage = $(".main-image-border.js-main-image").attr(
          "data-zoom-image"
        );
        var fullUrl = new URL(url);
        if (relativeImage) {
          return `${fullUrl.protocol}//${fullUrl.hostname}/${relativeImage}`;
        }
      },
      ({ htmlDom: $, url }) => {
        //semihandmade shopify
        let relativeImage = $("img.lazy.lazyload.img-fluid").attr("data-src");
        var fullUrl = new URL(url);
        if (relativeImage) {
          return `${fullUrl.protocol}${relativeImage}`;
        }
      },
      ({ htmlDom: $, url }) => $('[property="og:image"]').attr("content"),
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLd($);
        let image = jsonld && jsonld.image;

        if (image && image["@type"] === "ImageObject") {
          image = image.image;
        }

        if (Array.isArray(image)) {
          image = image[0];
        }

        if (image) return image;
      },
    ],
    currency: [
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLdGraphProduct($);
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
        let jsonld = jsonLdGraphProduct($);
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
        let jsonld = jsonLdGraphProduct($);
        return jsonld && jsonld.offers && jsonld.offers.availability;
      },
      ({ htmlDom: $, url }) =>
        $('[property="og:availability"]').attr("content"),
      ({ htmlDom: $, url }) => $jsonld("offers.availability")($, url),
      ({ htmlDom: $, url }) => $jsonld("offers.0.availability")($, url),
      ({ htmlDom: $, url }) => $("[itemprop=availability]").attr("href"),
    ],
    price: [
      ({ htmlDom: $, url }) => {
        let jsonld = jsonLdGraphProduct($);
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
      ({ htmlDom: $, url }) => toPriceFormat($jsonld("offers.0.price")($, url)),
      ({ htmlDom: $, url }) => toPriceFormat($jsonld("0.offers.price")($, url)),
      ({ htmlDom: $, url }) =>
        toPriceFormat($jsonld("offers.lowPrice")($, url)),
      ({ htmlDom: $, url }) =>
        toPriceFormat($jsonld("offers.0.lowPrice")($, url)),
      ({ htmlDom: $, url }) =>
        toPriceFormat($jsonld("offers.highPrice")($, url)),
      ({ htmlDom: $, url }) =>
        toPriceFormat($jsonld("offers.0.highPrice")($, url)),
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
