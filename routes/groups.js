const express = require('express');
const router = express.Router();
const groups = require('../services/groups');

/**
 * @swagger
 *
 * tags:
 *   name: Groups
 *   description: Grup Yönetimi
 *
 * definitions:
 *   Group:
 *     type: object
 *     required:
 *       - subject
 *     properties:
 *       subject:
 *         type: string
 *         example: Test Group Name
 *   Group Users:
 *     type: object
 *     required:
 *       - wa_ids
 *     properties:
 *       wa_ids:
 *         type: array
 *         items:
 *           type: string
 *           example: "905554443322"
 *
 */

/**
 * @swagger
 *
 * /groups:
 *   get:
 *     tags: [Groups]
 *     summary: Katınılan Gruplar
 *     description: Tüm grupların id bilgisini verir.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Tüm grup Id'leridir.
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
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      example: gBEGkFBUF1hIAglhPXLB_xys0f8
 *
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.get('/', groups.getAll);

/**
 * @swagger
 *
 * /groups:
 *   post:
 *     tags: [Groups]
 *     summary: Grup Oluşturna
 *     description: Yeni grup oluşturur.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Group Object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: Oluşturulan grubun bilgileridir.
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
 *                    example: 905554443322-1585146331
 *                  creation_time:
 *                    type: number
 *                    example: 1585146331
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.post('/', groups.create);

/**
 * @swagger
 *
 * /groups/{id}:
 *   get:
 *     tags: [Groups]
 *     summary: Grup Bilgisi
 *     description: Id'ye ait grup bilgisini döner.
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
 *           example: 905554443322-12345678
 *     responses:
 *       200:
 *         description: Grubun detaylı bilgileridir.
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
 *                  admins:
 *                    type: array
 *                    items:
 *                      type: string
 *                      example: 905554443322
 *                  creation_time:
 *                    type: number
 *                    example: 1585146331
 *                  creator:
 *                    type: number
 *                    example: 905554443322
 *                  participants:
 *                    type: array
 *                    items:
 *                      type: string
 *                      example: 905554443322
 *                  id:
 *                    type: string
 *                    example: 905554443322-1585146331
 *                  subject:
 *                    type: string
 *                    example: Test Group Name
 *
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.get('/:id', groups.get);

/**
 * @swagger
 *
 * /groups/{id}:
 *   put:
 *     tags: [Groups]
 *     summary: Grup Güncelleme
 *     description: Id'ye ait grup bilgisini günceller.
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
 *           example: 905554443322-12345678
 *       - name: body
 *         description: Group Object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: Grubun bilgileri güncellendi.
 *         schema:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *                example: 100
 *              message:
 *                type: string
 *                example: Success
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.put('/:id', groups.update);

/**
 * @swagger
 *
 * /groups/{id}/invite:
 *   get:
 *     tags: [Groups]
 *     summary: Grup Devetiyesi
 *     description: Id'ye ait grup için davet linki oluşturur.
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
 *           example: 905554443322-12345678
 *     responses:
 *       200:
 *         description: Grup için davet linkidir.
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
 *                  link:
 *                    type: string
 *                    example: https://chat.whatsapp.com/example12345678
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.get('/:id/invite', groups.getInvite);

/**
 * @swagger
 *
 * /groups/{id}/invite:
 *   delete:
 *     tags: [Groups]
 *     summary: Grup Devetiyesi
 *     description: Id'ye ait grup için oluşmuş davet linki siler.
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
 *           example: 905554443322-12345678
 *     responses:
 *       200:
 *         description: Id'ye ait grup için oluşmuş davet linki silindi.
 *         schema:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *                example: 100
 *              message:
 *                type: string
 *                example: Success
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.delete('/:id/invite', groups.deleteInvite);

/**
 * @swagger
 *
 * /groups/{id}/participants:
 *   delete:
 *     tags: [Groups]
 *     summary: Grup Üyesi Silme
 *     description: Id'ye ait grup için gönderilen kişiler gruptan çıkarır.
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
 *           example: 905554443322-12345678
 *       - name: body
 *         description: Group Object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Group Users'
 *     responses:
 *       200:
 *         description: Id'ye ait grup için gönderilen kişiler gruptan çıkarıldı.
 *         schema:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *                example: 100
 *              message:
 *                type: string
 *                example: Success
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.delete('/:id/participants', groups.deleteParticipants);

/**
 * @swagger
 *
 * /groups/{id}/leave:
 *   post:
 *     tags: [Groups]
 *     summary: Gruptan Çıkış
 *     description: Id'ye ait gruptan çıkış yapar.
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
 *           example: 905554443322-12345678
 *     responses:
 *       200:
 *         description: Id'ye ait gruptan çıkıldı.
 *         schema:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *                example: 100
 *              message:
 *                type: string
 *                example: Success
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.post('/:id/leave', groups.leave);

/**
 * @swagger
 *
 * /groups/{id}/icon:
 *   get:
 *     tags: [Groups]
 *     summary: Grup Resmi
 *     description: Id'ye ait grup resminin linkini verir.
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
 *           example: 905554443322-12345678
 *     responses:
 *       200:
 *         description: Id'ye ait grup resminin linkidir.
 *         schema:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *                example: 100
 *              message:
 *                type: string
 *                example: Success
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.get('/:id/icon', groups.getIcon);

/**
 * @swagger
 *
 * /groups/{id}/icon:
 *   post:
 *     tags: [Groups]
 *     summary: Grup Resmi
 *     description: Id'ye ait grup resmini ekler.
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
 *           example: 905554443322-12345678
 *       - name: image
 *         in: formData
 *         description: Yüklenecek resim.
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Id'ye ait grup resmi eklendi.
 *         schema:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *                example: 100
 *              message:
 *                type: string
 *                example: Success
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.post('/:id/icon', groups.setIcon);

/**
 * @swagger
 *
 * /groups/{id}/icon:
 *   delete:
 *     tags: [Groups]
 *     summary: Grup Resmi
 *     description: Id'ye ait grup resmini siler.
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
 *           example: 905554443322-12345678
 *     responses:
 *       200:
 *         description: Id'ye ait grup resmi silindi.
 *         schema:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *                example: 100
 *              message:
 *                type: string
 *                example: Success
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.delete('/:id/icon', groups.deleteIcon);

/**
 * @swagger
 *
 * /groups/{id}/admins:
 *   patch:
 *     tags: [Groups]
 *     summary: Grup Yöneticisi
 *     description: Id'ye ait grup için gönderilen kişiler için grup yöneticisi rolü eklenir.
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
 *         description: Group Object
 *         in:  body
 *         required: true
 *         type: array
 *         schema:
 *            $ref: '#/definitions/Group Users'
 *     responses:
 *       200:
 *         description: Id'ye ait grup için gönderilen kişiler için grup yöneticisi rolü eklendi.
 *         schema:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *                example: 100
 *              message:
 *                type: string
 *                example: Success
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.patch('/:id/admins', groups.addAdmins);

/**
 * @swagger
 *
 * /groups/{id}/admins:
 *   delete:
 *     tags: [Groups]
 *     summary: Grup Yöneticisi
 *     description: Id'ye ait grup için gönderilen kişiler için grup yöneticisi rolü kaldırılır.
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
 *         description: Group Object
 *         in:  body
 *         required: true
 *         type: array
 *         schema:
 *            $ref: '#/definitions/Group Users'
 *     responses:
 *       200:
 *         description: Id'ye ait grup için gönderilen kişiler için grup yöneticisi rolü kaldırıldı.
 *         schema:
 *            type: object
 *            properties:
 *              code:
 *                type: number
 *                example: 100
 *              message:
 *                type: string
 *                example: Success
 *       400:
 *         $ref: '#/responses/400'
 *       401:
 *         $ref: '#/responses/401'
 *       404:
 *         $ref: '#/responses/404'
 *       default:
 *         $ref: '#/responses/default'
 */
router.patch('/:id/admins', groups.deleteAdmins);

module.exports = router;
