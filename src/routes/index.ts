import { Router, Request as Req, Response as Res } from "express";
import { xAccessTokenCheck } from "../middlewares";
import { logFormat, logOptions, response } from "../utils";
import appRoute from "./app/app.route"
import morgan from "morgan";

const router = Router();

router.use(morgan(logFormat, logOptions()));

router.use("/api", xAccessTokenCheck, appRoute);

router.use("/:anyRoute", (req: Req, res: Res) => {
  const url: string = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
  response(`Url not found for: ${url}`, 404, res);
});

router.use("/", (req: Req, res: Res) => {
  const url: string = `${req.protocol}://${req.headers.host}`;
  response("Bhakti Portfolio API", 200, res, { url });
});

export default router;
