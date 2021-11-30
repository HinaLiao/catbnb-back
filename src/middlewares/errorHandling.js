/* eslint-disable no-unused-vars */
const errorHandling = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Something went wrong, please try again later',
    });
};

export default errorHandling;
