const jwt = require("jsonwebtoken");
const { response } = require("../utils");
require("dotenv").config();

const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    response("Unauthorized", 401, null, res);
  } else {
    const splitToken = req.headers.authorization.split(" ");

    if (splitToken.length !== 2 || splitToken[0] !== "Bearer") {
      response("Wrong authorization format", 400, null, res);
    } else {
      jwt.verify(
        splitToken[1],
        process.env.JWT_SECRET_KEY,
        { algorithms: ["HS256"] },
        (err, payload) => {
          if (err && err.name === "TokenExpiredError") {
            response("Token expired", 401, null, res);
          } else if (err) {
            response("Invalid Token", 401, null, res);
          } else {
            res.locals.tokenPayload = payload;
            next();
          }
        }
      );
    }
  }
};

const isAdmin = (req, res, next) => {
  const { role } = res.locals.tokenPayload;

  if (role.code === "SA") {
    next();
  } else {
    response(
      "Access forbiden",
      403,
      { message: "Only super admin can access" },
      res
    );
  }
};

module.exports = {
  isAuth,
  isAdmin,
};
