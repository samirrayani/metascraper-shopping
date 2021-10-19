const got = require("got");
const metascraper = require("metascraper")([require("..")()]);

test("live test amazon", async () => {
  const targetUrl = "https://www.amazon.com/dp/B07DN6CFYF/ref=tsm_1_tp_tc";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.image).toBe(
    "https://images-na.ssl-images-amazon.com/images/I/71jrApkhMaL.__AC_SX300_SY300_QL70_ML2_.jpg"
  );
}, 10000);

test("live test fireclaytile", async () => {
  const targetUrl =
    "https://www.fireclaytile.com/tile/colors/detail/white-wash/tile-field-3-x-3";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.image).toBe(
    "https://assets.fireclaytile.com/transforms/amazons3/colors/239835/17ebb_48d74.jpg"
  );
}, 10000);

test("live test bestbuy", async () => {
  const targetUrl =
    "https://www.bestbuy.com/site/lg-2-0-cu-ft-over-the-range-microwave-with-sensor-cooking-printproof-matte-black-stainless-steel/6113238.p?skuId=6113238";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.image).toBe(
    "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6113/6113238_sd.jpg"
  );
}, 10000);

test("live test arizonatile", async () => {
  const targetUrl =
    "https://www.arizonatile.com/en/products/quartzite/taj-mahal";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.image).toBe(
    "https://arizonatile.widen.net/content/bhondmdmej/jpeg/Taj%20Mahal%20Quartzite.jpg?w=2048&h=1182&quality=80&x.app=portals&keep=c"
  );
}, 10000);

test("live test semihandmade", async () => {
  const targetUrl = "https://www.semihandmade.com/pages/sss-quarterline";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.image).toContain(
    "https://cdn.shopify.com/s/files/1/0187/6812/files/door-sm-agave-quarterline_980x.png"
  );
}, 10000);

test("live test wayfair", async () => {
  const targetUrl =
    "https://www.wayfair.com/decor-pillows/pdp/ivy-bronx-epperly-frameless-lighted-bathroom-vanity-mirror-w004213284.html";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.image).toContain(
    "im/58976133/compr-r85/1294/129449826/epperly-frameless-lighted-bathroom-vanity-mirror.jpg"
  );
}, 10000);

test("live test cletile", async () => {
  const targetUrl =
    "https://www.cletile.com/products/forage-terrazzo-white-24x24?variant=16958471307335";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.image).toContain(
    "https://cdn.shopify.com/s/files/1/1127/8620/products/cle_tile_stone_cement_forage_terrazzo_white_24x24_single_main_formatted_2.0_grande.jpg"
  );
}, 10000);
