const express = require('express');
const router = express.Router();
const messages = require('../services/messages');

/**
 * @swagger
 *
 * tags:
 *   name: Message
 *   description: Mesaj Yönetimi
 *
 * definitions:
 *   Message:
 *     type: object
 *     required:
 *       - to
 *       - message_type
 *       - recipient_type
 *       - content
 *     properties:
 *       to:
 *         type: string
 *         format: 905554443322 / 905554443322-12723762
 *         description: Gönderilecek kişi veya grubun numarası
 *         example: "905554443322"
 *       message_type:
 *         type: string
 *         enum: [text, image, audio, video, document, location]
 *         example: text
 *         description: Gönderim tipi
 *       recipient_type:
 *         type: string
 *         enum: [individual, group]
 *         description: Alıcı tipi
 *         example: individual
 *       content:
 *         type: string
 *         description: Gönderim tipinin içeriği
 *         example: Test message
 *       preview_url:
 *         type: boolean
 *         description: URL önizlemesi
 *         example: false
 *       caption:
 *         type: string
 *         description: Ek metin alanı
 *         example: Test caption
 *       filename:
 *         type: string
 *         description: Video, Dosya ismi
 *         example: document.pdf
 *       address:
 *         type: string
 *         description: Adres metni
 *         example: Yapi Kredi Bankacılık Üssü Çayırova/Kocaeli
 *
 */

/**
 * @swagger
 *
 * /messages:
 *   post:
 *     tags: [Message]
 *     summary: Mesaj Gönderme
 *     description: Mesaj gönderir.
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
 *       201:
 *         description: Mesaj oluşturuldu.
 *         schema:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *                example: 100
 *              message:
 *                type: string
 *                example: Success
 *              payload:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    example: gBEGkFBUF1hIAglhPXLB_xys0f8
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 *
 */
router.post('/', messages.sendMessage);

module.exports = router;
