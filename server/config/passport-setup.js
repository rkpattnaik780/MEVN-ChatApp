const passport = require("passport");
var GitHubStrategy = require("passport-github2").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

function FindOrCreate(profile, done, findObject, createObject) {
  console.log(profile._json.sub);
  User.findOne(findObject).then(currentUser => {
    if (currentUser) {
      // already have this user
      done(null, currentUser);
    } else {
      // if not, create user in our db
      new User(createObject).save().then(newUser => {
        done(null, newUser);
      });
    }
  });
}

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
      FindOrCreate(
        profile,
        done,
        { providerId: "gi" + profile.id },
        {
          providerId: "gi" + profile.id,
          username: profile.username,
          name: profile.displayName,
          image: profile._json.avatar_url
        }
      );
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "324416967686-3bcokef474f6vmng9q40lb2lkmoab930.apps.googleusercontent.com",
      clientSecret: "zFdK89F4uBqQgUQQxCxZ3ilB",
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      FindOrCreate(
        profile,
        done,
        { providerId: "go" + profile.id },
        {
          providerId: "go" + profile._json.sub,
          username: profile._json.name,
          name: profile._json.name,
          image: profile._json.picture
        }
      );
    }
  )
);
