import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Endpoint de health check
 *     description: Retorna o status da API
 *     responses:
 *       200:
 *         description: API funcionando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
router.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

export default router;