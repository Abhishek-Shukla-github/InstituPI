const NodeGeocoder = require("node-geocoder");
let dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const options = {
  provider: process.env.GEOCODER_PROVIDER,

  //   fetch: customFetchImplementation,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null, // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);
module.exports = geocoder;
