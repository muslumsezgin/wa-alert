const fetch = require('node-fetch');
const logUtil = require("util");
const logger = require('../utils/logger');

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';
const PATCH = 'patch';

const Request = class {

    static async GET(url, header, callbacks) {
        await this.request(url, GET, null, callbacks, header)
    }

    static async POST(url, header, data, callbacks) {
        await this.request(url, POST, data, callbacks, header)
    }

    static async PUT(url, data, callbacks) {
        await this.request(url, PUT, data, callbacks)
    }

    static async DELETE(url, data, callbacks) {
        await this.request(url, DELETE, data, callbacks)
    }

    static async PATCH(url, data, callbacks) {
        await this.request(url, PATCH, data, callbacks)
    }

    static async request(url, method, data, callbacks, header) {
        let payload = {method};
        payload.headers = {
            'Content-Type': 'application/json',
            ...header
        };

        if (method !== GET) {
            payload.body = JSON.stringify({
                ...data
            });
        }

        try {
            logReq(url, payload);
            const response = await fetch(url, payload);

            let result;
            if (response.headers.get('content-type').match(/application\/json/)){
                result = await response.json()
            }
            //TODO MS: text
            /* else if (response.headers.get('content-type').match(/text\/plain/)){
                result = await response.text()
            } */
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

function logReq(url, object) {
    logger.info("====== REQUEST BEGIN ======");
    logger.info("URL: " + url);
    logger.info(logUtil.inspect(object, { showHidden: false, depth: null }));
    logger.info("======= REQUEST END =======");
}

function logRes(url, object) {
    logger.info("===== RESPONSE BEGIN ======");
    logger.info("URL: " + url);
    logger.info(logUtil.inspect(object, { showHidden: false, depth: null }));
    logger.info("====== RESPONSE END =======");
}

function logExp(url, object) {
    logger.error("===== EXCEPTION BEGIN =====");
    logger.error("URL: " + url);
    logger.error(logUtil.inspect(object, { showHidden: false, depth: null }));
    logger.error("====== EXCEPTION END ======");
}

module.exports = Request;
