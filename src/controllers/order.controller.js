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
 *               - numeroPedido
 *               - valorTotal
 *               - dataCriacao
 *               - items
 *             properties:
 *               numeroPedido:
 *                 type: string
 *                 example: "v10089016vdb"
 *               valorTotal:
 *                 type: number
 *                 example: 100
 *               dataCriacao:
 *                 type: string
 *                 format: date
 *                 example: "2023-07-19T12:24:11.529Z"
 *               items:
 *                 type: array
 *                 description: Lista de itens no pedido
 *                 items:
 *                   type: object
 *                   required:
 *                     - idItem
 *                     - quantidadeItem
 *                     - valorItem
 *                   properties:
 *                     idItem:
 *                       type: integer
 *                       example: 2434
 *                     quantidadeItem:
 *                       type: integer
 *                       example: 1
 *                     valorItem:
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
 * /order/{numeroPedido}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obter os dados de um pedido
 *     tags:
 *       - Pedidos
 *     description: Obtém os dados de um pedido
 *     parameters:
 *       - in: path
 *         name: numeroPedido
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
router.get('/:numeroPedido', async (req, res) => {
    try
    {
        res.json(await orderService.getOrder(req.params.numeroPedido));
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
 *               - numeroPedido
 *               - valorTotal
 *               - dataCriacao
 *               - items
 *             properties:
 *               numeroPedido:
 *                 type: string
 *                 example: "v10089016vdb"
 *               valorTotal:
 *                 type: number
 *                 example: 100
 *               dataCriacao:
 *                 type: string
 *                 format: date
 *                 example: "2023-07-19T12:24:11.529Z"
 *               items:
 *                 type: array
 *                 description: Lista de itens no pedido
 *                 items:
 *                   type: object
 *                   required:
 *                     - idItem
 *                     - quantidadeItem
 *                     - valorItem
 *                   properties:
 *                     idItem:
 *                       type: integer
 *                       example: 2434
 *                     quantidadeItem:
 *                       type: integer
 *                       example: 1
 *                     valorItem:
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
 * /order/{numeroPedido}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletar um pedido
 *     tags:
 *       - Pedidos
 *     description: Deleta um pedido
 *     parameters:
 *       - in: path
 *         name: numeroPedido
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
router.delete('/:numeroPedido', async (req, res) => {
    try
    {
        await orderService.deleteOrder(req.params.numeroPedido);
        res.json({ status: 'ok' });
    }
    catch (error)
    {
        ErrorHandler(error, res);
    }
});

export default router;