import { HttpError } from "../error/error.js";

export class OrderRepository
{
    #pool;

    constructor(pool)
    {
        this.#pool = pool;
    }

    async createOrder(orderDto)
    {
        // Verify if exists
        const result = await this.#pool.query(
            'SELECT * FROM "public"."Order" O WHERE O.orderId = $1',
            [orderDto.orderId]
        );

        if (result.rows.length != 0)
            throw new HttpError('Order already exists', 409);

        // Create
        const created = await this.#pool.query(
            'INSERT INTO "public"."Order" (orderId, value, creationDate) VALUES ($1, $2, $3) RETURNING *',
            [orderDto.orderId, orderDto.value, orderDto.creationDate]
        );

        return created.rows[0];
    }

    async updateOrder(orderDto)
    {
        // Verify if exists
        const result = await this.#pool.query(
            'SELECT * FROM "public"."Order" O WHERE O.orderId = $1',
            [orderDto.orderId]
        );

        if (result.rows.length == 0)
            throw new HttpError('Order not found', 404);
        
        // Update
        const updated = await this.#pool.query(
            'UPDATE "public"."Order" SET value = $2, creationDate = $3 WHERE orderId = $1 RETURNING *',
            [orderDto.orderId, orderDto.value, orderDto.creationDate]
        );

        return updated.rows[0];
    }

    async getOrder(orderId)
    {
        // Get order
        const result = await this.#pool.query(
            'SELECT * FROM "public"."Order" O WHERE O.orderId = $1',
            [orderId]
        );

        if (result.rows.length == 0)
            throw new HttpError('Order not found', 404);

        return result.rows[0];
    }

    async listOrders()
    {
        // List all orders
        const result = await this.#pool.query(
            'SELECT * FROM "public"."Order"'
        );

        return result.rows;
    }

    async deleteOrder(orderId)
    {
        // Check if exists
        const exists = await this.#pool.query(
            'SELECT * FROM "public"."Order" WHERE orderId = $1',
            [orderId]
        );
        
        if (exists.rows.length == 0)
            throw new HttpError('Order not found', 404);
        
        // Delete order
        const result = await this.#pool.query(
            'DELETE FROM "public"."Order" WHERE orderId = $1',
            [orderId]
        );
    }

    async createUpdateItem(itemDto, orderId)
    {
        // Verify if exists
        const result = await this.#pool.query(
            'SELECT * FROM "public"."Items" I WHERE I.orderId = $1 AND I.productId = $2',
            [orderId, itemDto.productId]
        );

        if (result.rows.length == 0)
        {  
            // Create
            const created = await this.#pool.query(
                'INSERT INTO "public"."Items" (orderId, productId, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
                [orderId, itemDto.productId, itemDto.quantity, itemDto.price]
            );

            return created.rows[0];
        }

        // Update
        const updated = await this.#pool.query(
            'UPDATE "public"."Items" SET quantity = $3, price = $4 WHERE orderId = $1 AND productId = $2 RETURNING *',
            [orderId, itemDto.productId, itemDto.quantity, itemDto.price]
        );

        return updated.rows[0];
    }

    async getItem(orderId, productId)
    {
        // Get order
        const result = await this.#pool.query(
            'SELECT * FROM "public"."Items" I WHERE I.orderId = $1 AND I.productId = $2',
            [orderId, productId]
        );

        if (result.rows.length == 0)
            throw new HttpError('Order item not found', 404);

        return result.rows[0];
    }

    async getOrderItems(orderId)
    {
        // Get order
        const result = await this.#pool.query(
            'SELECT * FROM "public"."Items" I WHERE I.orderId = $1',
            [orderId]
        );

        return result.rows;
    }

    async deleteOrderItem(orderId, productId)
    {
        // Check if exists
        const exists = await this.#pool.query(
            'SELECT * FROM "public"."Items" WHERE orderId = $1 AND productId = $2',
            [orderId, productId]
        );

        if (exists.rows.length == 0)
            throw new HttpError('Order item not found', 404);
        
        // Delete order item
        const result = await this.#pool.query(
            'DELETE FROM "public"."Items" WHERE orderId = $1 AND productId = $2',
            [orderId, productId]
        );
    }
}