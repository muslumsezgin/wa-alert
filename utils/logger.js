const {createLogger, transports, format} = require('winston');
const logUtil = require('util');

const logger = createLogger({
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            filename: './logs/application.log',
            json: false,
            maxsize: 100 * 1024 * 1024,
            maxFiles: 10,
        })
    ]
});

if (process.env.NODE_ENV === 'dev') {
    logger.add(new transports.Console({
        format: format.splat()
    }));
}

logger.stream = {
    write: message => logger.info(message)
};

const jsonFormatter = mes => logUtil.inspect(mes, {showHidden: false, depth: null})

const reqResLogger = function (req, res) {
    try {
        res.bodyDetail = JSON.parse(res.bodyDetail)
    } catch (e) {
        //not json
    }
    const result = '\nHeaders: ' + logger.json(req.headers) + '\nRequest: ' + logger.json(req.body) + '\nResponse: ' + logger.json(res.bodyDetail);
    res.bodyDetail = null;
    return result
};

const resBodyDetail = function (req, res, next) {
    let send = res.send;
    res.send = function (string) {
        res.bodyDetail = string;
        send.call(this, string);
    };
    next();
};

module.exports = logger;
module.exports.json = jsonFormatter;
module.exports.reqResLogger = reqResLogger;
module.exports.resBodyDetail = resBodyDetail;
