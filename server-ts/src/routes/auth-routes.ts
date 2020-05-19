import {Router} from "express";
import {authenticate} from "passport";
import {generateToken} from "../controllers/token_generator";

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
            scope: ["https://www.googleapis.com/auth/plus.login"]
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

export default authRouter;