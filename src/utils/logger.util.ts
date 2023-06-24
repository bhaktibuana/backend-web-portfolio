import moment from "moment";
import path from "path";
import fs from "fs";

export const logFormat = (tokens: any, req: any, res: any): string => {
  const date = `[${tokens.date(req, res, "web")}]`;
  const url = `"${tokens.method(req, res)} ${tokens.url(
    req,
    res
  )} HTTP/${tokens["http-version"](req, res)}"`;
  const responseTime = `${tokens["response-time"](req, res)}ms`;
  const ipAddress = `${tokens["remote-addr"](req, res)}`;
  const userAgent = `"${tokens["user-agent"](req, res)}"`;
  return [
    date,
    url,
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    responseTime,
    ipAddress,
    userAgent,
  ].join(" ");
};

export const logOptions = () => {
  const date = moment().format("YYYYMMDD").toString();
  const appDir = process.cwd();
  const logDir = path.join(appDir, "./logs");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  return {
    stream: fs.createWriteStream(path.join(logDir, `logfile-${date}.log`), {
      flags: "a",
    }),
  };
};
