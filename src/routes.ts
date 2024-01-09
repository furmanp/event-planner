import express from 'express';
import routes from './routes/index.routes.js';
import { morganMiddleware } from './middleware/morgan-middleware.js';
import { ProtectMiddleware } from './middleware/auth.js';
import { UsersController } from './controllers/users.controller.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {config} from '../config.js'

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Planner Api Library",
      version: "1.0.0",
      description: ""
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`
      }
    ]
  },
  apis: ["build/src/controllers/*.js"],
}

const specs = swaggerJsDoc(options)

export const router = express();
const userController = new UsersController();

router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
router.use(morganMiddleware);
router.post(
  '/user',
  ProtectMiddleware.verifyPasswordSafety,
  userController.createUsersHandler,
);
router.post('/signin', userController.singIn);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:id/:token', userController.resetPassword);

router.use('/api', ProtectMiddleware.protect, routes);
