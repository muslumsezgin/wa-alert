const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerConfig = require('./utils/swagger');
const routesConfig = require('./routes/index');
const logger = require('./utils/logger');
const fileUpload = require('express-fileupload');
const WAError = require('./model/WAError');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({path: __dirname + '/.env.local'});
} else {
    dotenv.config({path: __dirname + '/.env'});
}


const app = express();

morgan.token('detail', logger.reqResLogger);

app.use(fileUpload());
app.use(logger.resBodyDetail);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms -> :detail', {stream: logger.stream}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

swaggerConfig(app);
routesConfig(app);

app.use(function (req, res) {
    res.status(404).json(new WAError());
});

module.exports = app;
