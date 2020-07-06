import {Request, Response, User} from "express";
import {UserDTO} from "../models/user.model.dto";
import * as jwt from "jsonwebtoken";

// Fill `req.user` with `UserDTO` attributes
declare module "express" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends UserDTO {
    }

    export interface Request {
        user?: User;
    }
}

export const tokenList = {};

export const createAccessToken = (user: User): string => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: 60 * 120
        }
    );
};

export const createRefreshToken = (user: User): string => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: 60 * 1200
        }
    );
};

export const generateToken = (req: Request, res: Response): void => {
    // Create tokens
    const token = createAccessToken(req.user);
    const refreshToken = createRefreshToken(req.user);

    // Pass tokens to session
    req.session.token = token;
    req.session.refreshToken = refreshToken;

    // Persist tokens
    tokenList[refreshToken] = {
        token: token,
        userId: req.user._id
    };

    // Log user in and redirect
    req.session.isLoggedIn = true;
    res.redirect("http://localhost:8080/");
};