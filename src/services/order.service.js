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
        console.log(`Creating order with params: ${JSON.stringify(orderDto, null, 2)}`);
        
        // Create order
        let order = await repository.CreateOrder(orderDto);
        let updatedItems = [];

        if (order == null)
            throw new HttpError('Error creating order', 500);
        
        // Create/update order items
        for (const item of orderDto.items)
            updatedItems.push(await repository.CreateUpdateItem(item, orderDto.orderId));

        order.items = updatedItems;
        return order;
    }

    async updateOrder(orderDto)
    {
        console.log(`Updating order with params: ${JSON.stringify(orderDto, null, 2)}`);

        // Update order
        let order = await repository.UpdateOrder(orderDto);
        let updatedItems = [];

        if (order == null)
            throw new HttpError('Order not found', 404);

        // Create/update order items
        for (const item of orderDto.items)
            updatedItems.push(await repository.CreateUpdateItem(item, orderDto.orderId));

        order.items = updatedItems;
        return order;
    }

    async getOrder(orderId)
    {
        console.log(`Detailing order ID ${orderId}`);

        // Get order details
        let order = await repository.GetOrder(orderId);
        
        // Get order items
        order.items = await repository.GetOrderItems(orderId);

        return order;
    }

    async listOrders()
    {
        console.log(`Listing all orders`);

        // Get orders
        let orders = await repository.ListOrders();

        for (const order of orders)
            order.items = await repository.GetOrderItems(order.orderid);
            
        return orders;
    }

    async deleteOrder(orderId)
    {
        console.log(`Deleting order ID ${orderId}`);

        let items = await repository.GetOrderItems(orderId);

        // Delete order items
        for (const item of items)
            await repository.DeleteOrderItem(orderId, item.productid);
            
        // Delete order
        await repository.DeleteOrder(orderId);
    }
}