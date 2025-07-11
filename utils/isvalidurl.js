const validUrl = require("valid-url");

module.exports = function isValidUrl(url) {
  return validUrl.isWebUri(url);
};
