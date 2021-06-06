import express from 'express';
import log4js from 'log4js';
import bodyParser from 'body-parser';
import Router from './router'
import jwt from './middlewares/JWTVerifier';
import GeneralRequestHandler from './middlewares/general-request-handler'
import dotenv from 'dotenv'
import admin from 'firebase-admin'

dotenv.config()

if (!process.env.FIREBASE_CONFIG_PATH) {
    throw new Error("Could not find Firebase Configuration. Shutting down server.")
}

admin.initializeApp({
    credential: admin.credential.cert(require(process.env.FIREBASE_CONFIG_PATH || ""))
})

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(jwt())
app.use(GeneralRequestHandler)

const router = new Router(app)

log4js.configure({
    appenders: {
        errorAppender: { type: "file", filename: "errors.log" },
        defaultAppender: { type: "file", filename: "default.log" }
    },
    categories: {
        error: {
            appenders: ["errorAppender"],
            level: "error"
        },
        default: {
            appenders: ["defaultAppender"],
            level: "debug"
        }
    }
})


app.get("/health-check", function (req, res) {
    res.status(200).json({
        ok: true,
        uptime: process.uptime()
    })
});

app.listen(port, function () {
    console.log(`App is listening on port ${port}`);
});