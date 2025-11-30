import express from 'express';
import { OrderService } from '../services/order.service.js';
import { ErrorHandler } from '../error/error.js';
import { authMiddleware } from '../auth/auth.middleware.js';

// Define router and services
const router = express.Router();
const orderService = new OrderService();

// Use auth middleware
router.use(authMiddleware());

/**
 * @swagger
 * /order:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Criar novo pedido
 *     tags:
 *       - Pedidos
 *     description: Cria um novo pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - value
 *               - creationDate
 *               - items
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "v10089016vdb"
 *               value:
 *                 type: number
 *                 example: 100
 *               creationDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-07-19T12:24:11.529Z"
 *               items:
 *                 type: array
 *                 description: Lista de itens no pedido
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                     - price
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 2434
 *                     quantity:
 *                       type: integer
 *                       example: 1
 *                     price:
 *                       type: number
 *                       example: 1000
 *     responses:
 *       200:
 *         description: Pedido criado e retornado
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
router.post('/', async (req, res) => {
    try
    {
        res.json(await orderService.createOrder(req.body));
    }
    catch (error)
    {
        ErrorHandler(error, res);
    }
});

/**
 * @swagger
 * /order/list:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Listar todos os pedidos
 *     tags:
 *       - Pedidos
 *     description: Lista todos os pedidos
 *     responses:
 *       200:
 *         description: Pedidos listados com sucesso
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
router.get('/list', async (req, res) => {
    try
    {
        res.json(await orderService.listOrders());
    }
    catch (error)
    {
        ErrorHandler(error, res);
    }
});

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obter os dados de um pedido
 *     tags:
 *       - Pedidos
 *     description: Obtém os dados de um pedido
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido a ser detalhado
 *     responses:
 *       200:
 *         description: Dados do pedido retornados
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
router.get('/:orderId', async (req, res) => {
    try
    {
        res.json(await orderService.getOrder(req.params.orderId));
    }
    catch (error)
    {
        ErrorHandler(error, res);
    }
});

/**
 * @swagger
 * /order:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Atualizar um pedido
 *     tags:
 *       - Pedidos
 *     description: Atualiza um pedido e retorna o pedido novo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - value
 *               - creationDate
 *               - items
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "v10089016vdb"
 *               value:
 *                 type: number
 *                 example: 100
 *               creationDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-07-19T12:24:11.529Z"
 *               items:
 *                 type: array
 *                 description: Lista de itens no pedido
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                     - price
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 2434
 *                     quantity:
 *                       type: integer
 *                       example: 1
 *                     price:
 *                       type: number
 *                       example: 1000
 *     responses:
 *       200:
 *         description: Pedido atualizado e dados retornados
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
router.put('/', async (req, res) => {
    try
    {
        res.json(await orderService.updateOrder(req.body));
    }
    catch (error)
    {
        ErrorHandler(error, res);
    }
});

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletar um pedido
 *     tags:
 *       - Pedidos
 *     description: Deleta um pedido
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido a ser deletado
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
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
router.delete('/:orderId', async (req, res) => {
    try
    {
        await orderService.deleteOrder(req.params.orderId);
        res.json({ status: 'ok' });
    }
    catch (error)
    {
        ErrorHandler(error, res);
    }
});

export default router;