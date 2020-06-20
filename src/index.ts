import express from 'express';
import log4js from 'log4js';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

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

app.use(bodyParser.json())

app.get("/health-check", function (req, res) {
    res.status(200).json({
        ok: true,
        uptime: process.uptime()
    })
});

app.listen(port, function () {
    console.log(`App is listening on port ${port}`);
});