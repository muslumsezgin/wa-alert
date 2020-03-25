const ReturnObject = require('../model/ReturnObject');
const WAError = require('../model/WAError');
const request = require('../utils/request');
const logger = require('../utils/logger');
const url = require('../utils/url');

exports.getAll = async (req, res, next) => {
    try {
        let error = null;
        let result = {};
        await request.GET(url.groups(), null, {
            '200': (res) => {
                result = res.groups
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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({payload: result}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.get = async (req, res, next) => {
    try {
        const params = req.params;
        checkArgs(params, ['id']);
        let error = null;
        let result = {};
        await request.GET(url.groupsWithId(params.id), null, {
            '200': (res) => {
                result = res.groups[0]
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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({payload: result}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.create = async (req, res, next) => {
    try {
        const body = req.body;
        checkArgs(body, ['subject']);
        let error = null;
        let result = {};
        await request.POST(url.groups(), null, {'subject': body.subject}, {
            '200': (res) => {
                result = res.groups[0]
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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({payload: result}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.update = async (req, res, next) => {
    try {
        const body = req.body;
        const params = req.params;
        checkArgs(params, ['id']);
        checkArgs(body, ['subject']);
        let error = null;
        await request.PUT(url.groupsWithId(params.id), null, {'subject': body.subject}, {
            '200': (res) => {

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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.getInvite = async (req, res, next) => {
    try {
        const params = req.params;
        checkArgs(params, ['id']);
        let error = null;
        let result = {};
        await request.GET(url.groupsWithId(params.id, url.groupsType.invite), null, {
            '200': (res) => {
                result = res.groups[0]
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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({payload: result}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.deleteInvite = async (req, res, next) => {
    try {
        const params = req.params;
        checkArgs(params, ['id']);
        let error = null;
        await request.DELETE(url.groupsWithId(params.id, url.groupsType.invite), null, null, {
            '200': (res) => {

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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.deleteParticipants = async (req, res, next) => {
    try {
        const params = req.params;
        const body = req.body;
        checkArgs(params, ['id']);
        checkArgs(body, ['wa_ids']);
        let error = null;
        await request.DELETE(url.groupsWithId(params.id, url.groupsType.participants), null, {'wa_ids': body.wa_ids}, {
            '200': (res) => {

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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.leave = async (req, res, next) => {
    try {
        const params = req.params;
        checkArgs(params, ['id']);
        let error = null;
        await request.POST(url.groupsWithId(params.id, url.groupsType.leave), null, null, {
            '200': (res) => {

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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.getIcon = async (req, res, next) => {
    try {
        const params = req.params;
        checkArgs(params, ['id']);
        let error = null;
        let result = {};
        await request.GET(url.groupsWithId(params.id, url.groupsType.iconLink), null, {
            '200': (res) => {
                result = res.groups[0].icon
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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({payload: result}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.setIcon = async (req, res, next) => {
    try {
        const params = req.params;
        checkArgs(params, ['id']);

        if (!req.files || Object.keys(req.files).length === 0 && req.files.image) {
            return res.status(400).json(new ReturnObject(new WAError(103, 'Parameter value is not valid')));
        }

        const buf = Buffer.from(req.files.image.data);
        let ab = new ArrayBuffer(buf.length);
        let view = new Uint8Array(ab);
        for (let i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }

        let error = null;
        await request.POST(url.groupsWithId(params.id, url.groupsType.icon), {'Content-Type': 'image/*'}, view, {
            '201': (res) => {

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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.deleteIcon = async (req, res, next) => {
    try {
        const params = req.params;
        checkArgs(params, ['id']);
        let error = null;
        await request.DELETE(url.groupsWithId(params.id, url.groupsType.icon), null, null, {
            '200': (res) => {

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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.addAdmins = async (req, res, next) => {
    try {
        const params = req.params;
        const body = req.body;
        checkArgs(params, ['id']);
        checkArgs(body, ['wa_ids']);
        let error = null;
        await request.PATCH(url.groupsWithId(params.id, url.groupsType.admins), null, {'wa_ids': body.wa_ids}, {
            '200': (res) => {

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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

exports.deleteAdmins = async (req, res, next) => {
    try {
        const params = req.params;
        const body = req.body;
        checkArgs(params, ['id']);
        checkArgs(body, ['wa_ids']);
        let error = null;
        await request.DELETE(url.groupsWithId(params.id, url.groupsType.admins), null, {'wa_ids': body.wa_ids}, {
            '200': (res) => {

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
        if (error) {
            logger.error(logger.json(error));
            res.status(400).json(new ReturnObject(error))
        } else
            res.status(200).json(new ReturnObject({}))
    } catch (e) {
        logger.error(logger.json(e));
        if (e instanceof WAError) {
            res.status(400).json(new ReturnObject(e))
        } else {
            res.status(404).json(new ReturnObject())
        }
    }
};

function checkArgs(body, args = []) {
    args.map(item => {
        if (!body[item])
            throw new WAError(103, 'Parameter value is not valid');
    })
}
