import { OrderDTO } from '../dtos/order/OrderDTO.js';

export class OrderService
{
    constructor()
    {

    }

    createOrder(orderDto)
    {
        console.log(`Creating order with params: ${JSON.stringify(orderDto, null, 2)}`);
        return orderDto;
    }

    updateOrder(orderDto)
    {
        console.log(`Updating order with params: ${JSON.stringify(orderDto, null, 2)}`);
        return orderDto;
    }

    getOrder(orderId)
    {
        console.log(`Detailing order ID ${orderId}`);
        return { orderId: "v10089016vdb", value: 100, creationDate: "2023-07-19T12:24:11.529Z" };
    }

    listOrders()
    {
        console.log(`Listing all orders`);
        return [{ orderId: "v10089016vdb", value: 100, creationDate: "2023-07-19T12:24:11.529Z" }];
    }

    deleteOrder(orderId)
    {
        console.log(`Deleting order ID ${orderId}`);
    }
}