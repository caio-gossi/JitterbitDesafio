export function ErrorHandler(error, res)
{
    console.error(error);
    const status = error.statusCode ?? 500;
    res.status(status).json({ status: 'error', message: error.message ?? 'Internal server error' });
}

export class HttpError extends Error
{
    constructor(message, statusCode)
    {
        super(message);
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace?.(this, this.constructor);
    }
}