const Request = require('./_base-request');

const DEFAULT_HOST = 'api.chess.com';
const DEFAULT_PORT = 443;
const DEFAULT_SCHEME = 'https';

module.exports.builder = function () {
  return Request.builder()
    .withHost(DEFAULT_HOST)
    .withPort(DEFAULT_PORT)
    .withScheme(DEFAULT_SCHEME);
};
