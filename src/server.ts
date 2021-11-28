import express from 'express';
import { router } from './routes';

import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

// swaggerUi.setup() -> setup json onde vão estar todas as informações da nossa docs]
// De primeiro parâmetro, passo a rota que minha docs ficará
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

app.listen(3333, () => console.log('running server.. http://localhost:3333'))