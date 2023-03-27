const express = require("express");
const { api } = require("./configs");

const router = express.Router();

/* API V1 */
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
