const generatePrevUrl = (req, offset, limit) => {
  const reqUrl = `${req.protocol}://${req.get("Host")}${req.originalUrl}`;
  const reqUrlArr = reqUrl.split(/[&?]+/);
  const originalUrl = removeOffsetLimit(reqUrlArr);

  return offset >= 0 && limit > 0
    ? offset - limit < 0
      ? null
      : `${originalUrl}&offset=${offset - limit}&limit=${limit}`.replace(
          /[?&]+/,
          "?"
        )
    : null;
};

const generateNextUrl = (req, count, offset, limit) => {
  const reqUrl = `${req.protocol}://${req.get("Host")}${req.originalUrl}`;
  const reqUrlArr = reqUrl.split(/[&?]+/);
  const originalUrl = removeOffsetLimit(reqUrlArr);

  return offset >= 0 && limit > 0
    ? offset + limit >= count
      ? null
      : `${originalUrl}&offset=${offset + limit}&limit=${limit}`.replace(
          /[?&]+/,
          "?"
        )
    : null;
};

const generateCurrentUrl = (req, offset, limit) => {
  if (offset === 0 && limit === 0) {
    return null;
  } else {
    return `${req.protocol}://${req.get("Host")}${req.originalUrl}`;
  }
};

const removeOffsetLimit = (urlArr) => {
  const removeOffset = urlArr.filter((item) => !item.includes("offset"));
  const removeLimit = removeOffset.filter((item) => !item.includes("limit"));
  const rawUrl = removeLimit[0] + "?";

  removeLimit.shift();
  const queryUrl = removeLimit.join("&");

  return rawUrl + queryUrl;
};

module.exports = {
  generatePrevUrl,
  generateNextUrl,
  generateCurrentUrl,
};
