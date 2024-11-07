import { celebrate, Joi, Segments } from 'celebrate';
import { orderSchema } from '../controllers/order';

export const validCreateProduct = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    image: Joi.object({
      fileName: Joi.string(),
      originalName: Joi.string(),
    }).required(),
    category: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().allow(null),
  }),
});

export const validCreateOrder = celebrate({
  [Segments.BODY]: orderSchema,
});
