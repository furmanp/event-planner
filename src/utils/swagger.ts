import { Express, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import {logger} from './winston-logger.js'
import { config } from './../../config.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Planner Api Library',
      version: '1.0.0',
      description: '',
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
      },
    ],
  },
  apis: ['build/src/controllers/*.js'],
};

const specs = swaggerJsDoc(options);

function swaggerDocs(app: Express, port: number): void {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

  app.get('docs.json', (_req:Request, res: Response) => {
    res.setHeader("Content-Type", "application/json")
    res.send(specs)}
  )
  logger.info(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs;
