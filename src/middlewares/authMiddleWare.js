const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (!req.headers.act) {
    return res.status(401).json({
      message: "Authenticationn",
      status: "ERR",
    });
  }
  const token = req.headers.act.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "Authenticationnn",
        status: "ERR",
      });
    }
    const { payload } = user;
    if (payload.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        message: "Authenticationnnn",
        status: "ERR",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  if (!req.headers.act) {
    return res.status(401).json({
      message: "Authenticationnnnn",
      status: "ERR",
    });
  }
  const token = req.headers.act.split(" ")[1];
  const id = req.params.id;

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "Authenticationnnnnnn",
        status: "ERR",
      });
    }
    const { payload } = user;
    if (payload.isAdmin || payload.id === id) {
      next();
    } else {
      return res.status(401).json({
        message: "Authenticationnnnnnnn",
        status: "ERR",
      });
    }
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleware,
};
