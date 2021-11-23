const errorNotFound = (req, res) => {
  res
    .status(404)
    .json({ message: `'${req.method}' request to '${req.path}' not found` });
};

export default errorNotFound;
