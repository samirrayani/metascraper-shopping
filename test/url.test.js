const got = require("got");
const metascraper = require("metascraper")([require("..")()]);

// test("live test dacor", async () => {
//   const targetUrl =
//     "https://www.dacor.com/us/products/archives/heritage/cooktops/professional-36-induction-cooktop";
//   const { body: html, url } = await got(targetUrl, {
//     headers: {
//       "user-agent":
//         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
//     },
//   });

//   const metadata = await metascraper({ html, url });
//   expect(metadata.url).toBe(
//     "https://www.dacor.com/us/products/archives/heritage/cooktops/professional-36-induction-cooktop"
//   );
// }, 10000);

// test("live test marble", async () => {
//   const targetUrl = "https://marble.com/quartz-countertops/vena-carrara/1203";
//   const { body: html, url } = await got(targetUrl, {
//     headers: {
//       "user-agent":
//         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
//     },
//   });

//   const metadata = await metascraper({ html, url });
//   expect(metadata.url).toBe(null);
// }, 10000);

// test("live test sherwin williams", async () => {
//   const targetUrl =
//     "https://www.sherwin-williams.com/homeowners/color/find-and-explore-colors/paint-colors-by-family/SW6958-dynamic-blue";
//   const { body: html, url } = await got(targetUrl, {
//     headers: {
//       "user-agent":
//         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
//     },
//   });

//   const metadata = await metascraper({ html, url });

//   expect(metadata.image).toBe(
//     "https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=0192C6"
//   );
// }, 10000);

test("test benjamin moore", async () => {
  const targetUrl =
    "https://www.benjaminmoore.com/en-us/color-overview/find-your-color/color/af-10/gardenia?color=AF-10";
  const { body: html, url } = await got(targetUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
    },
  });

  const metadata = await metascraper({ html, url });
  expect(metadata.image).toBe(
    "https://media.benjaminmoore.com/WebServices/prod/cdp/836x1045/white-paint-252-gardenia-AF-10-rgb.jpg"
  );
});

// //

// test("test farrow & ball", async () => {
//   const targetUrl =
//     "https://www.farrow-ball.com/en-us/paint-colours/California-Collection-Citrona";
//   const { body: html, url } = await got(targetUrl, {
//     headers: {
//       "user-agent":
//         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
//     },
//   });

//   const metadata = await metascraper({ html, url });
//   console.log(metadata);

//   expect(metadata.image).toBe(
//     "https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=0192C6"
//   );
// });
