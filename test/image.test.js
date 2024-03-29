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
    "https://d3prqoxewi1hpr.cloudfront.net/transforms/amazons3/colors/239835/17ebb_48d74.jpg"
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
    "https://arizonatile.widen.net/content/bhondmdmej/jpeg/Taj%20Mahal%20Quartzite.jpg"
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
    "Epperly+Frameless+Lighted+Bathroom+%2F+Vanity+Mirror.jpg"
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
    "https://www.cletile.com/img/400/400/resize/f/o/forage_terrazzo_white_square_ft0003-main.jpg"
  );
}, 10000);

test("portola paints & glazes", async () => {
  // http://www.portolapaints.com/roman-clay/in-the-navy-roman-clay
  const targetUrl =
    "http://www.portolapaints.com/roman-clay/in-the-navy-roman-clay";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.image).toContain(
    "http://static1.squarespace.com/static/543cd753e4b079875c5e7e32/5df28f0904b7db043c6b2280/5df28f2aa705f6184694bf51/1616453421322/4+-+In+the+Navy.jpg?format=1500w"
  );
}, 10000);

test("crate & barrel", async () => {
  const targetUrl =
    "https://www.crateandbarrel.com/letti-70x55-ivory-throw-blanket/s311552?localedetail=US&storeid=521&a=1552&campaignid=10461646734&adgroupid=103999388779&targetid=pla-1461518834556&pla_sku=311552&pcat=HSW&ag=adult&gclid=Cj0KCQjwxtSSBhDYARIsAEn0thShQi_rAq7RS6KPSfgnS58OA87XRDPmvEUd14OsFLFvhcClE6hN33IaAtMbEALw_wcB";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.79 Safari/537.36 MS/${new Date()}`,
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.image).toContain(
    "https://cb.scene7.com/is/image/Crate/Letti55x70ThrowIvorySSF21"
  );
}, 100000);

test("rh", async () => {
  const targetUrl =
    "https://rh.com/catalog/product/product.jsp?productId=prod13810430";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.image).toContain(
    "https://media.restorationhardware.com/is/image/rhis/prod13810430_E910352224_F?$np-fullwidth-lg$"
  );
}, 100000);
