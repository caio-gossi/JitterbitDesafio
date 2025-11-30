import { AuthService } from "./auth.service.js";

const authService = new AuthService();

export function authMiddleware()
{
    return async (req, res, next) =>
    {
        console.log("Executing middleware!");
        
        try
        {
            const header = req.headers.authorization;

            if (!header?.startsWith('Bearer ')) 
                return res.status(401).json({ status: 'error', message: 'Unauthorized' });

            const token = header.slice(7);
            const payload = await authService.validateToken(token);
            req.user = payload.sub;

            next();
        }
        catch (error)
        {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }
    }
}