const router = require("express").Router();
const passport = require("passport");

router.get("/check", (req, res) => {
  console.log("user - " + req.user);
  if (req.user === undefined) {
    res.json({});
  } else {
    res.json({
      user: req.user
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ msg: "Logged out" });
});

//Github OAuth
router.get("/github", passport.authenticate("github"));

router.get(
  "/github/redirect",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // res.send(req.user);
    res.redirect("http://localhost:8080/");
  }
);

// Google OAuth
router.get("/google", passport.authenticate("google",{ scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("http://localhost:8080/");
  }
);

module.exports = router;
