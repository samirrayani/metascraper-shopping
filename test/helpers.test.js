const helpers = require("../helpers");

describe("helpers", () => {
  it("toPriceFormat", () => {
    const givenThens = [["2.75", 2.75], ["$2.75", 2.75], ["2,75", 2.75], ["0.50", 0.50]];
    for (const [given, then] of givenThens){
      const when = helpers.toPriceFormat(given);
      expect(when).toBe(then);
    }
  })
})