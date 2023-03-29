const express = require("express");
const morgan = require("morgan");
const { api } = require("./configs");
const { logFormat, logOptions } = require("./utils").loggerUtil;
const apiV1Routes = require("./api/v1/routes");

const router = express.Router();

/* API V1 */
router.use(morgan(logFormat, logOptions()));
router.use(api.v1, apiV1Routes);

router.use(api.v1, (_, res) => {
  res.status(200).json({
    message: "Bhakti Portfolio API V1",
  });
});
/* ========== END ========== */

router.use("/", (_, res) => {
  res.status(200).json({
    message: "Bhakti Portfolio API Server",
  });
});

module.exports = router;
