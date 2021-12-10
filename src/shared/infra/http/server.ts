import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import databaseConnection from "@shared/infra/typeorm";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";
import { router } from './routes';
import swaggerFile from "../../../swagger.json";

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

// Criando um middleware de erro
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    })
  }

  return response.status(500).json({
    statusError: "error",
    message: `Internal server error - ${err.message}`,
  })
})

databaseConnection.then(() => {
  console.log('database connected...');
  app.listen(3333, () => console.log('running server...'));
}).catch((error) => console.log('Error: ', error.mensage));