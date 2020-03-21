const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerConfig = require('./swaggerConfig');
const routesConfig = require('./routes/index');
const logger = require('./utils/logger');
const logUtil = require("util");

//TODO env
dotenv.config({ path: __dirname + "/.env" });

const app = express();

morgan.token('detail', logger.reqResLogger);

app.use(function (req, res, next) {
    let send = res.send;
    res.send = function (string) {
        res.bodyDetail = string;
        send.call(this, string);
    };
    next();
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms -> :detail', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

swaggerConfig(app);
routesConfig(app);

module.exports = app;
