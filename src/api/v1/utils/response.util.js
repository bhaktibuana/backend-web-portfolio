const response = (
  message,
  status,
  payload,
  res,
  count = null,
  prev = null,
  next = null,
  current = null
) => {
  res.status(status).json([
    {
      status,
      message,
      payload,
      metadata: {
        count,
        prev,
        next,
        current,
      },
    },
  ]);
};

module.exports = response;
