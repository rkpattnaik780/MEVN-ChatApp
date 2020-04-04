//token handling middleware
let jwt = require("jsonwebtoken");
const { generateFromRefreshToken, tokenList } = require("./token_generator");

let checkToken = (req, res, next) => {
  // Check if logged in
  if (!req.session.isLoggedIn) {
    return res.json({
      success: false,
      message: "Please log in"
    });
  }

  // Extract access token
  let token = req.headers["x-auth-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

  // Extract refresh token
  let refreshToken =
    req.headers["refresh-token"] || req.headers["refresh-token"];

  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (refreshToken && refreshToken.startsWith("Bearer ")) {
    refreshToken = refreshToken.slice(7, refreshToken.length);
  }

  // If token was successfully extracted, verify it, if not return error
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      // if error occurred, try to get new access token, if not decode payload
      if (err) {
        if (refreshToken && refreshToken in tokenList) {
          generateFromRefreshToken(refreshToken);
          next();
        } else {
          res.json({
            msg: "Please login again"
          });
        }
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

module.exports = {
  checkToken: checkToken
};
