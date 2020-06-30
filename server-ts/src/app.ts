import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import bluebird from "bluebird";
import cors from "cors";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import { session, initialize } from "passport";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
const passportSetup = import("./config/passport-setup");

// Controllers (route handlers)
import { index } from "./routes/index";
import { getApi } from "./routes/api";
import authRouter from "./routes/auth-routes";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
      console.log("Successfully connected to server");
    },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

const corsOption: any = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token", "refresh-token"]
};
app.use(cors(corsOption));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.use(
    cookieSession({
        name: "session",
        maxAge: 24 * 60 * 60 * 1000,
        keys: ["qwefgfds"]
    })
);

// initialize passport
app.use(initialize());
app.use(session());



/**
 * Primary app routes.
 */
app.get("/", index);

/**
 * API examples routes.
 */
app.get("/api", getApi);
app.use("/auth", authRouter);

export default app;
