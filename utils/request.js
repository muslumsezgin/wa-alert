const fetch = require('node-fetch');
const logUtil = require('util');
const logger = require('../utils/logger');
const url = require('../utils/url');


const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';
const PATCH = 'patch';

let authToken = '';

const Request = class {

    static async GET(url, header, callbacks) {
        await this.request(url, GET, null, callbacks, header)
    }

    static async POST(url, header, data, callbacks) {
        await this.request(url, POST, data, callbacks, header)
    }

    static async PUT(url, header, data, callbacks) {
        await this.request(url, PUT, data, callbacks, header)
    }

    static async DELETE(url, header, data, callbacks) {
        await this.request(url, DELETE, data, callbacks, header)
    }

    static async PATCH(url, header, data, callbacks) {
        await this.request(url, PATCH, data, callbacks, header)
    }

    static async request(url, method, data, callbacks, header) {
        let payload = {method};
        payload.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken,
            ...header
        };

        if (method !== GET && payload.headers['Content-Type'] === 'application/json') {
            payload.body = JSON.stringify({
                ...data
            });
        } else {
            payload.body = data;
        }

        try {
            logReq(url, payload);
            let response = await fetch(url, payload);

            if (response.status === 401) {
                logger.info('====== TOKEN REFRESH ======');
                const isAuth = await token();
                if (isAuth) {
                    let newPayload = payload;
                    newPayload.headers = {
                        ...payload.headers,
                        'Authorization': 'Bearer ' + authToken,
                    };
                    logReq(url, newPayload);
                    response = await fetch(url, newPayload);
                }
            }

            let result;
            if (response.headers.get('content-type').match(/application\/json/)) {
                result = await response.json()
            }

            logRes(url, result);


            if (callbacks[response.status]) {
                callbacks[response.status](result);
            } else if (callbacks.otherwise) {
                callbacks.otherwise(result);
            }
        } catch (err) {
            logExp(url, err);
            if (callbacks.fail) {
                callbacks.fail(err)
            }
        }
    }

};

async function token() {
    let result = false;
    await Request.POST(url.login(), {'Authorization': 'Basic ' + process.env.WA_USER}, null, {
        '200': (res) => {
            authToken = res.users[0].token;
            result = true;
        }
    });
    return result;
}

function logReq(url, object) {
    logger.info('====== REQUEST BEGIN ======');
    logger.info('URL: ' + url);
    logger.info(logUtil.inspect(object, {showHidden: false, depth: null}));
    logger.info('======= REQUEST END =======');
}

function logRes(url, object) {
    logger.info('===== RESPONSE BEGIN ======');
    logger.info('URL: ' + url);
    logger.info(logUtil.inspect(object, {showHidden: false, depth: null}));
    logger.info('====== RESPONSE END =======');
}

function logExp(url, object) {
    logger.error('===== EXCEPTION BEGIN =====');
    logger.error('URL: ' + url);
    logger.error(logUtil.inspect(object, {showHidden: false, depth: null}));
    logger.error('====== EXCEPTION END ======');
}

module.exports = Request;
