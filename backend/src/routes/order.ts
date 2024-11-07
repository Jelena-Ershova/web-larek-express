// POST /order — создаёт заказ

import { Router } from 'express';
import { validCreateOrder } from '../middlewares/validators';
import createOrder from '../controllers/order';

const router = Router();

router.post('/', validCreateOrder, createOrder);

export default router;
