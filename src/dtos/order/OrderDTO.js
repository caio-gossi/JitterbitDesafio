export class OrderDTO
{
    constructor({ orderId, value, creationDate })
    {
        this.orderId = orderId;
        this.value = value;
        this.creationDate = creationDate;
    }
}