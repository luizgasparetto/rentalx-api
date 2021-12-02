import "reflect-metadata";
import express from 'express';
import { router } from './routes';

import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

import databaseConnection from "./database";

import "./shared/container"

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

databaseConnection.then(() => {
  console.log('Database connected');
  app.listen(3333, () => console.log('running server...'));
}).catch((error) => console.log('Error: ', error.mensage));