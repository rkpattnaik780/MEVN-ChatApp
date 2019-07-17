const passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: "41487ad2b4772d6a7094",
      clientSecret: "e4bb42e29d9dd1bb0d698496431af381cbcbc99c",
      callbackURL: "/auth/github/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("passport call back fired !!");
      // can be used to save stuffs to database

      User.findOne({ githubId: profile.id }).then(currentUser => {
        if (currentUser) {
          // already have this user
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            githubId: profile.id,
            username: profile.username,
            image: profile._json.avatar_url
          })
            .save()
            .then(newUser => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
