const router = require("express").Router();
const passport = require("passport");

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/redirect",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // res.send(req.user);
    res.redirect("http://localhost:8080/");
  }
);

module.exports = router;
