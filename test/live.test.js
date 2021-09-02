const got = require("got");
const metascraper = require("metascraper")([require("..")()]);

test("live test fireclay", async () => {
  const targetUrl =
    // "https://www.wayfair.com/appliances/pdp/bosch-100-series-24-48-dba-built-in-fully-integrated-dishwasher-with-3rd-rack-and-precisionwash-bch10013.html";
    "https://www.fireclaytile.com/quick-ship/glass/quick-ship-glass-grackle-matte-3x12";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.retailer).toBe("Fireclay Tile");
  expect(metadata.hostname).toBe("fireclaytile.com");
}, 10000);

test("live test wayfair", async () => {
  const targetUrl =
    "https://www.wayfair.com/appliances/pdp/bosch-100-series-24-48-dba-built-in-fully-integrated-dishwasher-with-3rd-rack-and-precisionwash-bch10013.html";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.brand).toBe("Bosch");
  expect(metadata.hostname).toBe("wayfair.com");
}, 10000);
