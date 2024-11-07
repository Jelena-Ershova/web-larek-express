import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import Product from '../models/product';

import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({});
    return res.send({ items: products, total: products.length });
  } catch (error) {
    return next({ message: `Произошла ошибка получения товаров - ${error}` });
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      category,
      description,
      image,
      price,
    } = req.body;

    const item = await Product.create({
      title, image, category, description, price,
    });
    return res.status(201).send(item);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return next(new BadRequestError(`Ошибка в запросе - ${error.message}`));
    }
    if ((error as Error).message.includes('E11000')) {
      return next(new ConflictError(`Такой товар уже существует в базе - ${(error as Error).message}`));
    }
    return next({ message: `Произошла ошибка создания товара - ${error}` });
  }
};
