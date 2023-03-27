const connectionError = (error, res) => {
  res.status(500).json([
    {
      status: 500,
      message: "Internal server error",
      payload: error,
      metadata: {
        count: null,
        prev: null,
        next: null,
        current: null,
      },
    },
  ]);
};

module.exports = connectionError;
