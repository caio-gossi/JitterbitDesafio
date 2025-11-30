import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

// Get env variables
dotenv.config();

// Start Express app
const app = express();
app.use(express.json());

// Configure Swagger Doc
const swaggerSpec = swaggerJsdoc
(
    {
        definition: 
        {
            openapi: '3.0.0',
            info: 
            {
                title: 'API para o desafio da Jitterbit',
                version: '1.0.0'
            }
        },
        apis: ['./src/routes/*.js']
    }
);

// Configure Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount routes
const routesPath = path.join(process.cwd(), 'src', 'routes');
fs.readdirSync(routesPath).forEach((file) =>
    {
        if (file.endsWith('.js'))
        {
            import(`./routes/${file}`)
            .then((module) =>
            {
                const route = module.default;
                const routeName = file.replace('.js', '');
                app.use(`/${routeName}`, route);
            })
        }
    }
)

// Export app for server.js
export default app;