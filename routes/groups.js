const express = require('express');
const router = express.Router();

const groups = require('../services/groups');

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Grup Yönetimi
 */

/**
 * @swagger
 *
 * definitions:
 *   Group:
 *     type: object
 *     required:
 *       - subject
 *     properties:
 *       subject:
 *         type: string
 *   Group Admins:
 *     type: object
 *     required:
 *       - wa_ids
 *     properties:
 *       wa_ids:
 *         type: array
 *         items:
 *           type: string
 */


/**
 * @swagger
 *
 * /groups:
 *   get:
 *     tags: [Groups]
 *     summary: Grup Bilgileri
 *     description: Bütün grupların bilgilerini döner
 *     responses:
 *       200:
 *         description: Grup Bilgileri
 */
router.get('/', groups.getAllGroup);

/**
 * @swagger
 *
 * /groups:
 *   post:
 *     tags: [Groups]
 *     summary: Grup Oluşturna
 *     description: Yeni grup oluşturur
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Message Object
 *         in:  body
 *         required: true
 *         type: array
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: Mesaj gönderildi
 */
router.post('/', groups.createGroup);

/**
 * @swagger
 *
 * /groups/{id}:
 *   get:
 *     tags: [Groups]
 *     summary: Grup Bilgisi
 *     description: Id'ye ait grup bilgisini döner
 *     responses:
 *       200:
 *         description: Grup Bilgisi
 */
router.get('/:id', groups.getGroup);

/**
 * @swagger
 *
 * /groups/{id}:
 *   put:
 *     tags: [Groups]
 *     summary: Grup Güncelleme
 *     description: Id'ye ait grup bilgisini günceller
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Message Object
 *         in:  body
 *         required: true
 *         type: array
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: Mesaj gönderildi
 */
router.put('/:id', groups.updateGroup);

/**
 * @swagger
 *
 * /groups/{id}/invite:
 *   get:
 *     tags: [Groups]
 *     summary: Grup Devetiyesi
 *     description: Id'ye ait grup için davet linki oluşturur
 *     responses:
 *       200:
 *         description: Grup Davet Linki
 */
router.get('/:id/invite', groups.getGroupInvite);

/**
 * @swagger
 *
 * /groups/{id}/invite:
 *   get:
 *     tags: [Groups]
 *     summary: Grup Devetiyesi
 *     description: Id'ye ait grup için davet linki oluşturur
 *     responses:
 *       200:
 *         description: Grup Davet Linki
 */
router.delete('/:id/invite', groups.getGroupInvite);






/**
 * @swagger
 *
 * /groups/{id}/admins:
 *   patch:
 *     tags: [Groups]
 *     summary: Grup Admin
 *     description: Gruba admin ekleme
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: WA Group ID
 *         format: 905554443322-12345678
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         description: Message Object
 *         in:  body
 *         required: true
 *         type: array
 *         schema:
 *            $ref: '#/definitions/Group Admins'
 *     responses:
 *       200:
 *         description: Mesaj gönderildi
 */
router.patch('/:id/admins', groups.addAdmins);

module.exports = router;
