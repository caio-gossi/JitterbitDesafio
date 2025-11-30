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
        console.log(username);
        console.log(password);

        console.log("Logging in...");
        
        if (username !== "user" || password !== "user")
            throw new HttpError('Incorrect credentials', 403);

        return this.generateToken({ sub: username });
    }

    generateToken(payload)
    {
        const secret = process.env.JWT_SECRET;

        if (secret == null)
            throw new HttpError('JWT secret not defined.', 500);

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
            throw new HttpError('JWT secret not defined.', 500);

        try
        {
            const decoded = jwt.verify(token, secret);
            return decoded;
        }
        catch (error)
        {
            throw new HttpError('Invalid token', 401);
        }
        
        return true;
    }
}