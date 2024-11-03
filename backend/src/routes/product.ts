// GET /product — возвращает все товары
// POST /product — создаёт товар

import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/products';
import { validCreateProduct } from '../middlewares/validators';

const router = Router();

router.get('/', getProducts);

router.post('/', validCreateProduct, createProduct);

export default router;
