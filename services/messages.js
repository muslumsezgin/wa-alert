const request = require('../utils/request');
const WAError = require('../model/WAError');
const logger = require('../utils/logger');

let authToken = '';

const message_types = ['text', 'image', 'audio', 'video', 'document', 'location'];
const recipient_types = ['individual', 'group'];

exports.sendMessage = (req, res, next) => {
    try {
        const body = req.body;
        checkArgs(body);
        const json = formatter(body);
        post(json);
        res.send(json);
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).send(e)
        } else {
            res.status(404).send(new WAError())
        }
    }

};

function checkArgs(body) {
    if (
        /**
         * require parameters check
         */
        !!(body.to && body.type && body.recipient_type && body.content)
        /**
         * message_type type check
         */
        && !!(message_types.find(t => t === body.type))
        /**
         * recipient type check
         */
        && !!(recipient_types.find(r => r === body.recipient_type))
    )
        throw new WAError("Parameter value is not valid");
}

function formatter(body) {
    const message_type = body.message_type;
    let object = {
        to: body.to,
        type: message_type,
        recipient_type: body.recipient_type,
        [message_type]: {}
    };
    switch (message_type) {
        case 'text':
            object[message_type] = {
                body: body.content
            };
            object['preview_url'] = body.preview_url;
            break;
        case 'image':
        case 'video':
            object[message_type] = {
                link: body.content,
                caption: body.caption
            };
            break;
        case 'audio':
            object[message_type] = {
                link: body.content
            };
            break;
        case 'document':
            object[message_type] = {
                link: body.content,
                caption: body.caption,
                filename: body.filename
            };
            break;
        case 'location':
            const coordinates = body.content.split(',');
            if (coordinates.length !== 2)
                throw new WAError(101, "Invalid location Info");
            object[message_type] = {
                longitude: coordinates[0],
                latitude: coordinates[1],
                name: body.caption,
                address: body.address
            };
            break;
    }
    return object;
}

async function post(data) {
    let result = {};
    await request.POST(process.env.WA_MESSAGE_URL, {'Authorization': 'Bearer ' + authToken}, data, {
        '200': (res) => {
            result = res;
        },
        '401': (res) => {
            token(data)
        },
        otherwise: (res) => {
        },
        fail: (err) => {
        }
    });
}

function token(data) {
    request.POST(process.env.WA_LOGIN_URL, {'Authorization': 'Basic ' + process.env.WA_USER}, null, {
        '200': (res) => {
            authToken = res.users[0].token;
            post(data)
        },
        otherwise: (res) => {

        },
        fail: (err) => {

        }
    });
}
