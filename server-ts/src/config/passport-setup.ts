import passport from "passport";
import {Strategy as GithubStrategy} from "passport-github2";
import {Profile, Strategy as GoogleStrategy, VerifyCallback} from "passport-google-oauth20";
import {User} from "../models/user.model";
import {UserDTO, UserCreateDTO, UserFindDTO} from "../models/user.model.dto";

passport.serializeUser<UserDTO, number>((user: UserDTO, done: CallableFunction) => {
    done(null, user._id);
});

passport.deserializeUser((id: number, done: CallableFunction) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

const FindOrCreate = (done: CallableFunction, findObject: UserFindDTO, createObject: UserCreateDTO) => {
    User.findOne(findObject).then(currentUser => {
        if (currentUser) {
            // already have this user
            return done(null, currentUser);
        } else {
            // if not, create user in our db
            new User(createObject).save().then(newUser => {
                return done(null, newUser);
            });
        }
    });
};

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            // can be used to save stuffs to database
            FindOrCreate(
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
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            FindOrCreate(
                done,
                {providerId: "go" + profile._json.sub},
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