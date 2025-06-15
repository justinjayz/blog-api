// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack); // Logs error in terminal

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
};
