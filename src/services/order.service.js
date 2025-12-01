import { OrderDTO } from '../dtos/order/OrderDTO.js';
import { pool } from '../db/db.js';
import { OrderRepository } from '../repositories/order.repository.js';
import { HttpError } from '../error/error.js';

const repository = new OrderRepository(pool);

export class OrderService
{
    constructor()
    {

    }

    async createOrder(orderDto)
    {
        console.log(`Criando pedido com parâmetros: ${JSON.stringify(orderDto, null, 2)}`);
        
        // Create order
        let order = await repository.createOrder(orderDto);
        let updatedItems = [];

        if (order == null)
            throw new HttpError('Erro ao criar pedido', 500);
        
        // Create/update order items
        for (const item of orderDto.items)
            updatedItems.push(await repository.createUpdateItem(item, orderDto.numeroPedido));

        order.items = updatedItems;
        return order;
    }

    async updateOrder(orderDto)
    {
        console.log(`Atualizando pedido com parâmetros: ${JSON.stringify(orderDto, null, 2)}`);

        // Update order
        let order = await repository.updateOrder(orderDto);
        let updatedItems = [];

        if (order == null)
            throw new HttpError('Pedido não encontrado', 404);

        // Create/update order items
        for (const item of orderDto.items)
            updatedItems.push(await repository.createUpdateItem(item, orderDto.numeroPedido));

        order.items = updatedItems;
        return order;
    }

    async getOrder(orderId)
    {
        console.log(`Detalhando pedido de ID ${orderId}`);

        // Get order details
        let order = await repository.getOrder(orderId);
        
        // Get order items
        order.items = await repository.getOrderItems(orderId);

        return order;
    }

    async listOrders()
    {
        console.log(`Listando todos os pedidos`);

        // Get orders
        let orders = await repository.listOrders();

        for (const order of orders)
            order.items = await repository.getOrderItems(order.orderid);
            
        return orders;
    }

    async deleteOrder(orderId)
    {
        console.log(`Deletando pedido de ID ${orderId}`);

        let items = await repository.getOrderItems(orderId);

        // Delete order items
        for (const item of items)
            await repository.deleteOrderItem(orderId, item.productid);
            
        // Delete order
        await repository.deleteOrder(orderId);
    }
}