const express = require('express');
const router = express.Router();

const messages = require('../services/messages');

/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Mesaj Yönetimi
 */


/**
 * @swagger
 *
 * definitions:
 *   Message:
 *     type: object
 *     required:
 *       - to
 *       - type
 *       - recipient_type
 *       - content
 *     properties:
 *       to:
 *         type: string
 *         format: 905554443322 / 905554443322-12723762
 *         description: Gönderilecek kişi veya grubun numarası
 *       message_type:
 *         type: string
 *         enum: [text, image, audio, video, document, location]
 *         description: Gönderim tipi
 *       recipient_type:
 *         type: string
 *         enum: [individual, group]
 *         description: Alıcı tipi
 *       content:
 *         type: string
 *         description: Gönderim tipinin içeriği
 *       preview_url:
 *         type: boolean
 *         description: URL önizlemesi
 *       caption:
 *         type: string
 *         description: Ek metin alanı
 *       filename:
 *         type: string
 *         description: Video, Dosya ismi
 *       address:
 *         type: string
 *         description: Adres metni
 *
 */

/**
 * @swagger
 *
 * /messages:
 *   post:
 *     tags: [Message]
 *     summary: Mesaj Gönderimi
 *     description: Mesaj gönderimi yapar
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Message Object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Message'
 *     responses:
 *       200:
 *         description: Mesaj gönderildi
 */
router.post('/', messages.sendMessage);

module.exports = router;
