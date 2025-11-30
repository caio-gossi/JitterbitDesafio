import { OrderDTO } from '../dtos/order/OrderDTO.js';
import { pool } from '../db/db.js';
import { OrderRepository } from '../repositories/order.repository.js';

const repository = new OrderRepository(pool);

export class OrderService
{
    constructor()
    {

    }

    async createOrder(orderDto)
    {
        console.log(`Creating order with params: ${JSON.stringify(orderDto, null, 2)}`);
        return await repository.CreateUpdateOrder(orderDto);
    }

    async updateOrder(orderDto)
    {
        console.log(`Updating order with params: ${JSON.stringify(orderDto, null, 2)}`);
        return await repository.CreateUpdateOrder(orderDto);
    }

    async getOrder(orderId)
    {
        console.log(`Detailing order ID ${orderId}`);
        return await repository.GetOrder(orderId);
    }

    async listOrders()
    {
        console.log(`Listing all orders`);
        return await repository.ListOrders();
    }

    async deleteOrder(orderId)
    {
        console.log(`Deleting order ID ${orderId}`);
        await repository.DeleteOrder(orderId);
    }
}