module.exports = (req, res, next) => {
  let data = res.locals.data;

  console.log(res.statusCode);

  if (res.statusCode >= 400) {
    data = {
      code: res.statusCode,
      message: `Error`,
    };
  }

  next();
};
