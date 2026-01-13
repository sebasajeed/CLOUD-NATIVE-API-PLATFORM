const logger = require("../logs/logger");
const Log = require("../logs/log.model");

module.exports = async (err, req, res, next) => {
  logger.error(err.message, { requestId: req.requestId });

  await Log.create({
    level: "error",
    message: err.message,
    meta: {
      requestId: req.requestId,
      stack: err.stack
    }
  });

  res.status(500).json({
    error: "Internal Server Error",
    requestId: req.requestId
  });
};
