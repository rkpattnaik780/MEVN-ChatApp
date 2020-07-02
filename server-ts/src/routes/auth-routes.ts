import {Router, Request, Response} from "express";
import {authenticate} from "passport";
import {generateToken, tokenList} from "../controllers/token_generator";

// Create Express server
const authRouter = Router();

authRouter.get("/check", (req: Request, res: Response): void => {
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
    (req: Request, res: Response): void => {
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
    function (req: Request, res: Response): void {
        console.log(`/google/callback, req.user: ${req.user}`);
        res.redirect("http://localhost:8080/");
    }
);

authRouter.get("/logout", (req: Request, res: Response): void => {
    req.logout();
    delete tokenList[req.session.refreshToken];
    req.session = null;
    res.json({msg: "Logged out", tokenlist: tokenList});
});

export default authRouter;