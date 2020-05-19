// import { serializeUser, deserializeUser, use } from "passport";
import passport from "passport";
import * as githubPassport from "passport-github2";
import * as googlePassport from "passport-google-oauth";
import User, {UserI} from "../models/user.model";

const githubStrategy = githubPassport.Strategy;
const googleStrategy = googlePassport.OAuth2Strategy;

passport.serializeUser((user: UserI, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

const FindOrCreate = (profile: any, done: any, findObject: any, createObject: any) => {
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
};

passport.use(
    new githubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        (accessToken: string, refreshToken: string, profile: any, done: any) => {
            // can be used to save stuffs to database
            FindOrCreate(
                profile,
                done,
                {providerId: "gi" + profile.id},
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
    new googleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            FindOrCreate(
                profile,
                done,
                {providerId: "go" + profile.id},
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