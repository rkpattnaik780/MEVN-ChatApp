"use strict";

import {Request, Response} from "express";


/**
 * GET /api
 * List of API examples.
 */
export const getApi = (req: Request, res: Response): void => {
    res.json({
        title: "API Examples"
    });
};