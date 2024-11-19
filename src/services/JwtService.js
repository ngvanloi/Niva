const jwt = require("jsonwebtoken");

const generalAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1h" }
  );

  return access_token;
};

const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );

  return refresh_token;
};

const refreshToken = (rft) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(rft, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err || !user) {
          resolve({
            status: "ERR",
            message: "Refresh token incomplete",
          });
        }
        const { payload } = user;
        const newAct = await generalAccessToken({ id: payload?.id, isAdmin: payload?.isAdmin });
        resolve({
          status: "OK",
          message: "Refresh token complete",
          data: newAct,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshToken,
};
