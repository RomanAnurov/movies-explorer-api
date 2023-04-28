const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

module.exports = {
  limiter,
};
