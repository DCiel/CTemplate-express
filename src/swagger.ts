import swaggerJSDoc from 'swagger-jsdoc';
import { config } from './common/config';

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Документация для вашего API',
        },
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'X-API-KEY', //  Имя заголовка, который будет использоваться для передачи API ключа
                    description: 'API Key для доступа к защищенным маршрутам',
                },
            },
        },
        security: [
            {
                ApiKeyAuth: [], // Применить ко всем путям
            },
        ],
        servers: [
            {
                url: config.url.backend_url
            },
            {
                url: `http://localhost:${config.port}`, // URL вашего сервера
            },
        ],
    },
    apis: ['./src/modules/*/*.controller.ts'], // Путь к файлам с аннотациями Swagger
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);