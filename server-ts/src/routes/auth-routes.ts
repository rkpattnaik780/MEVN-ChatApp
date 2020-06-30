import {Router} from "express";
import {authenticate} from "passport";
import {generateToken, tokenList} from "../controllers/token_generator";

// Create Express server
const authRouter = Router();

authRouter.get("/check", (req, res) => {
    console.log(`/auth/check, req.user: ${req.user}`);
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

//Github OAuth
authRouter.get("/github", authenticate("github"), generateToken);

authRouter.get(
    "/github/redirect",
    authenticate("github", {failureRedirect: "/login"}),
    (req, res) => {
        //res.send(req.user);
        console.log(`/github/redirect, req.user: ${req.user}`);
        res.redirect("http://localhost:8080/");
    }
);

// Google OAuth
authRouter.get(
    "/google",
    authenticate(
        "google",
        {
            scope: ["profile"]
        },
        generateToken
    )
);

authRouter.get(
    "/google/callback",
    authenticate("google", {failureRedirect: "/login"}),
    function (req, res) {
        console.log(`/google/callback, req.user: ${req.user}`);
        res.redirect("http://localhost:8080/");
    }
);

authRouter.get("/logout", (req, res) => {
    req.logout();
    delete tokenList[req.session.refreshToken];
    req.session = null;
    res.json({msg: "Logged out", tokenlist: tokenList});
});

export default authRouter;