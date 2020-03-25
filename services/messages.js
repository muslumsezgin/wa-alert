const WAError = require('../model/WAError');
const ReturnObject = require('../model/ReturnObject');
const request = require('../utils/request');
const logger = require('../utils/logger');
const url = require('../utils/url');

const message_types = ['text', 'image', 'audio', 'video', 'document', 'location'];
const recipient_types = ['individual', 'group'];

exports.sendMessage = async (req, res, next) => {
    try {
        const body = req.body;
        checkArgs(body);
        const json = formatter(body);
        const payload = await send(json);
        res.status(201).json(new ReturnObject({payload}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

function checkArgs(body) {
    if (
        /**
         * require parameters check
         */
        !(body.to && body.message_type && body.recipient_type && body.content)
        /**
         * message_type type check
         */
        || !(message_types.find(t => t === body.message_type))
        /**
         * recipient type check
         */
        || !(recipient_types.find(r => r === body.recipient_type))
    )
        throw new WAError(103, 'Parameter value is not valid');
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
            if (body.recipient_type === 'group') {
                object['render_mentions'] = true
            }
            break;
        case 'image':
            object[message_type] = {
                link: body.content,
                caption: body.caption
            };
            if (body.recipient_type === 'group') {
                object['render_mentions'] = true
            }
            break;
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
                throw new WAError(101, 'Invalid location Info');
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

async function send(data) {
    let error = null;
    let result = {};
    await request.POST(url.messages(), null, data, {
        '201': (res) => {
            result = res.messages[0];
        },
        otherwise: (res) => {
            if (res.errors)
                error = new WAError(111, res.errors[0].details);
            else
                error = new WAError(105, 'WhatsApp invalid response!')
        },
        fail: (err) => {
            error = new WAError()
        }
    });
    if (error) throw error;
    return result;
}
