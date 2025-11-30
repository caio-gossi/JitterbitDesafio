export class OrderRepository
{
    #pool;

    constructor(pool)
    {
        this.#pool = pool;
    }

    async CreateUpdateOrder(orderDto)
    {
        // Verify if exists
        const result = await this.#pool.query(
            'SELECT * FROM "public"."Order" O WHERE O.orderId = $1',
            [orderDto.orderId]
        );

        // Create
        if (result.rows.length == 0)
        {
            const created = await this.#pool.query(
                'INSERT INTO "public"."Order" (orderId, value, creationDate) VALUES ($1, $2, $3)',
                [orderDto.orderId, orderDto.value, orderDto.creationDate]
            );

            return created.rows[0];
        }

        // Update
        const updated = await this.#pool.query(
            'UPDATE "public"."Order" SET value = $2, creationDate = $3 WHERE orderId = $1 RETURNING *',
            [orderDto.orderId, orderDto.value, orderDto.creationDate]
        );

        return updated.rows[0];
    }

    async GetOrder(orderId)
    {
        // Get order
        const result = await this.#pool.query(
            'SELECT * FROM "public"."Order" O WHERE O.orderId = $1',
            [orderId]
        );

        if (result.rows.length == 0)
            throw new Error("Order not found");

        return result.rows[0];
    }

    async ListOrders()
    {
        // List all orders
        const result = await this.#pool.query(
            'SELECT * FROM "public"."Order"'
        );

        return result.rows;
    }

    async DeleteOrder(orderId)
    {
        // Delete order
        const result = await this.#pool.query(
            'DELETE FROM "public"."Order" WHERE orderId = $1',
            [orderId]
        );

        if (result.rows.length == 0)
            throw new Error("Order not found");
    }
}