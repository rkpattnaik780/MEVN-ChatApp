import { Router } from "express";
import { authenticate } from "passport";
import { generateToken } from "../controllers/token_generator";

// Create Express server
const authRouter = Router();

authRouter.get("/check", (req: Request, res: Response) => {
  console.log("user - " + req.user);
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
  authenticate("github", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    // res.send(req.user);
    res.redirect("http://localhost:8080/");
  }
);

export default authRouter;