// import { serializeUser, deserializeUser, use } from "passport";
import passport from "passport";
import Strategy from "passport-github2";
// import OAuth2Strategy as GoogleStrategy from "passport-google-oauth";
import User from "../models/user.model";

passport.serializeUser((user, done) => {
  console.log("inside serialize user");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("inside deserialize user");
  User.findById(id).then(user => {
    done(null, user);
  });
});

const FindOrCreate = (profile: any, done: any, findObject: any, createObject: any) => {
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
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
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