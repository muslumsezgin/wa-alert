const messagesRouter = require('./messages');
const documentRouter = require('./document');
const groupsRouter = require('./groups');
const WAError = require('../model/WAError');
const ReturnObject = require('../model/ReturnObject');

/**
 * @swagger
 *
 * definitions:
 *   Error:
 *     type: object
 *     properties:
 *       code:
 *         type: number
 *       message:
 *         type: string
 *
 *
 * responses:
 *   400:
 *     description: İçerik eksik veya geçersiz.
 *     schema:
 *      type: object
 *      properties:
 *       code:
 *         type: number
 *         example: 103
 *       message:
 *         type: string
 *         example: Parameter value is not valid
 *   401:
 *     description: Yetkilendirme bilgisi eksik veya geçersiz.
 *     schema:
 *      type: object
 *      properties:
 *       code:
 *         type: number
 *         example: 102
 *       message:
 *         type: string
 *         example: Missing or invalid authentication credentials
 *   404:
 *     description: Bulunamadı.
 *     schema:
 *      type: object
 *      properties:
 *       code:
 *         type: number
 *         example: 999
 *       message:
 *         type: string
 *         example: Unknown Error
 *   default:
 *     description: Error.
 *     schema:
 *         $ref: '#/definitions/Error'
 */

const auth = function (req, res, next) {
    if (req.get('Authorization') !== process.env.WA_USER) {
        return res.status(401).json(new ReturnObject(new WAError(102, 'Missing or invalid authentication credentials')));
    }
    next();
};

module.exports = (app) => {
    app.use('/', documentRouter);
    app.use('/messages', auth, messagesRouter);
    app.use('/groups', auth, groupsRouter)
};
