export class OrderDTO
{
    constructor({ orderId, value, creationDate, items })
    {
        this.orderId = orderId;
        this.value = value;
        this.creationDate = creationDate;
        this.items = items;
    }
}