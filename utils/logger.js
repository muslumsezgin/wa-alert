const {createLogger, transports, format} = require('winston');
const logUtil = require("util");

const logger = createLogger({
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            filename: './logs/application.log',
            json: false,
            maxsize: 100 * 1024,
            maxFiles: 100,
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
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
    const result = '\nRequest: ' + logger.json(req.body) + '\nResponse: ' + logger.json(res.bodyDetail);
    res.bodyDetail = null;
    return result
};

module.exports = logger;
module.exports.json = jsonFormatter;
module.exports.reqResLogger = reqResLogger;
