const router = require("express").Router();
const passport = require("passport");
let { generateToken, tokenList } = require("../controllers/token_generator");

router.get("/check", (req, res) => {
  console.log("user - " + req.user);
  if (req.user === undefined) {
    res.json({});
  } else {
    res.set("x-auth-token", req.session.token || "Not authorised");
    res.set("refresh-token", req.session.refreshToken || "Not authorised");
    res.json({
      user: req.user
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  delete tokenList[req.session.refreshToken];
  req.session = {};
  res.json({ msg: "Logged out", tokenlist: tokenList });
});

//Github OAuth
router.get("/github", passport.authenticate("github"), generateToken);

router.get(
  "/github/redirect",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // res.send(req.user);
    res.redirect("http://localhost:8080/");
  }
);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }, generateToken),
  function(req, res) {
    res.redirect("http://localhost:8080/");
  }
);

module.exports = router;
