const helpers = require("../helpers");

const priceCases = [
  ["2.75", 2.75],
  ["$2.75", 2.75],
  ["2,75", 2.75],
  ["0.50", 0.5],
  ["0", 0],
  ["0.0", 0],
  [".", undefined],
  [",", undefined],
  ["", undefined],
  [undefined, undefined],
  [null, undefined],
  [NaN, undefined],
  [{}, undefined],
  [() => {}, undefined],
  [0, 0],
  [-2, -2],
  [-0.2, -0.2]
];

describe("helpers", () => {
  it.each(priceCases)("toPriceFormat(%s) === %s", (given, then) => {
    expect(helpers.toPriceFormat(given)).toBe(then);
  });
});
