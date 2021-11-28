import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory'
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategories';


const categoriesRoutes = Router();

// Multer atua como middleware
// Permite o upload de arquivos (fizemos um upload csv)
const upload = multer({
  dest: './tmp'
})

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
})

categoriesRoutes.get('/', (req, res) => {
  return listCategoryController.handle(req, res);
})

// upload.single('file') atua como middleware do Multer, o single é para só receber um arquivo por vez, e o file será o fieldname
categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
  return importCategoryController.handle(req, res);
})

export { categoriesRoutes }