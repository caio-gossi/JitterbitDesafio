import express from 'express';
import { AuthService } from '../auth/auth.service.js';
import { ErrorHandler } from '../error/error.js';

const router = express.Router();
const authService = new AuthService();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticar usuário
 *     tags:
 *       - Auth
 *     description: Autentica um usuário e devolve o JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user"
 *               password:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       200:
 *         description: Autenticação realizada com sucesso
 *       400:
 *         description: Request mal-formada
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
router.post('/login', async (req, res) => {
    try
    {
        res.json(authService.login(req.body.username, req.body.password));
    }
    catch (error)
    {
        ErrorHandler(error, res);
    }
});

export default router;