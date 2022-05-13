"use strict";

const { get, isBoolean, isEmpty, isNumber, isString } = require("lodash");
const urlParser = require("url");
const memoizeOne = require("memoize-one").default || require("memoize-one");
const { decodeHTML } = require("entities");

const toPriceFormat = (price) => {
  if (typeof price === "string") {
    // remove all non-numeric characters and symbols like $, € and others others.
    // except for '.' and ','
    price = price.replace(/[^\d\.\,]/g, "");

    price = /^(\d+\.?){1}(\.\d{2,3})*\,\d{1,2}$/.test(price)
      ? price.replace(/\./g, "").replace(",", ".") // case 1: price is formatted as '12.345,67'
      : price.replace(/,/g, ""); // case 2: price is formatted as '12,345.67'
  }

  return ~~Number(price) > 0 ? +parseFloat(price).toFixed(2) : undefined;
};

const getHostname = (url) => {
  return urlParser.parse(url).hostname.replace("www.", "");
};

const jsonld = memoizeOne(
  ($) =>
    $('script[type="application/ld+json"]')
      .map((i, e) => {
        try {
          return JSON.parse($(e).contents().text());
        } catch (_) {
          return undefined;
        }
      })
      .get()
      .filter(Boolean),
  (newArgs, oldArgs) => newArgs[0].html() === oldArgs[0].html()
);

const $jsonld = (propName) => ($) => {
  const collection = jsonld($);
  let value;

  collection.find((item) => {
    value = get(item, propName);
    return !isEmpty(value) || isNumber(value) || isBoolean(value);
  });

  return isString(value) ? decodeHTML(value) : value;
};

module.exports = {
  toPriceFormat,
  getHostname,
  $jsonld,
};
