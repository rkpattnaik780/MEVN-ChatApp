import * as jwt from "jsonwebtoken";
const tokenList = {};

const createAccessToken = (auth) => {
  return jwt.sign(
    {
      id: auth.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 60 * 120
    }
  );
};

export const createRefreshToken = (auth) => {
  return jwt.sign(
    {
      id: auth.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: 60 * 1200
    }
  );
};

export const generateToken =  (req, res) => {
  // Create tokens
  const token = createAccessToken(req.user);
  const refreshToken = createRefreshToken(req.user);

  // Pass tokens to session
  req.session.token = token;
  req.session.refreshToken = refreshToken;

  // Persist tokens
  tokenList[refreshToken] = {
    token: token,
    userId: req.user.id
  };

  // Log user in and redirect
  req.session.isLoggedIn = true;
  res.redirect("http://localhost:8080/");
};