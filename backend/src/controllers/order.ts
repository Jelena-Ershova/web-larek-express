import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import { Joi } from 'celebrate';
import { Types, Error } from 'mongoose';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import { IOrder, IProduct } from '../types';

export const orderSchema = Joi.object<IOrder>({
  payment: Joi.equal('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().required(),
});

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { items, total } = req.body;

  const idOrder = faker.string.uuid();
  try {
    if (!Array.isArray(items) || !items.length) {
      return next(new BadRequestError('Ошибка валидации заказа список товаров не может быть пустым.'));
    }
    const products = (await Product.find<IProduct>({
      _id: { $in: items.map((item: string) => new Types.ObjectId(item)) },
    })).filter((product) => !!product.price);

    if (products.length !== items.length) {
      return next(new BadRequestError('Ошибка в заказе. Некоторые товары не доступны - неверный ID'));
    }

    const totalOrder = products.reduce((sum, product) => sum + product.price!, 0);

    if (totalOrder !== total) {
      return next(new BadRequestError('Ошибка в заказе. Сумма заказа не верна.'));
    }

    return res.send({ id: idOrder, total: totalOrder });
  } catch (error) {
    if ((error as Error).message.includes('Uint8Array')) {
      return next(new BadRequestError(`Неверный формат ID товара - ${(error as Error).message}`));
    }
    return next({ message: `Произошла ошибка отправки заказа - ${(error as Error).message}` });
  }
};

export default createOrder;
