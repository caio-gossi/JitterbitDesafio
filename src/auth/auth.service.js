import { HttpError } from '../error/error.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export class AuthService
{
    constructor()
    {

    }

    login(username, password)
    {        
        // Stub for auth database implementation
        if (username !== "user" || password !== "user")
            throw new HttpError('Credenciais incorretas.', 403);

        return this.generateToken({ sub: username });
    }

    generateToken(payload)
    {
        const secret = process.env.JWT_SECRET;

        if (secret == null)
            throw new HttpError('JWT secret não definido.', 500);

        const token = jwt.sign(
            payload,
            secret,
            {
                expiresIn: "15m",
                algorithm: "HS256"
            }
        );
        
        return { user: payload.sub, token: token };
    }

    validateToken(token)
    {
        const secret = process.env.JWT_SECRET;

        if (secret == null)
            throw new HttpError('JWT secret não definido.', 500);

        try
        {
            const decoded = jwt.verify(token, secret);
            return decoded;
        }
        catch (error)
        {
            throw new HttpError('Token inválido', 401);
        }
        
        return true;
    }
}