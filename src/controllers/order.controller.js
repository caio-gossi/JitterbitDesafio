import express from 'express';
import { OrderService } from '../services/order.service.js';

const router = express.Router();
const orderService = new OrderService();

/**
 * @swagger
 * /order:
 *   post:
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
router.post('/', (req, res) => {
    res.json(orderService.createOrder(req.body));
});

/**
 * @swagger
 * /order/{orderId}:
 *   get:
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
router.get('/:orderId', (req, res) => {
    res.json(orderService.getOrder(req.params.orderId));
});

/**
 * @swagger
 * /order/list:
 *   get:
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
router.get('/list', (req, res) => {
    res.json(orderService.listOrders());
});

/**
 * @swagger
 * /order:
 *   put:
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
router.put('/', (req, res) => {
    res.json(orderService.updateOrder(req.body));
});

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
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
router.delete('/:orderId', (req, res) => {
    orderService.deleteOrder(req.params.orderId);
    res.json({ status: 'ok' });
});

export default router;