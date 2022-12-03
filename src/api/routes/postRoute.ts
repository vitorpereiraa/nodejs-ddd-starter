import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';

import config from "../../../config";
import IPostController from '../../controllers/IControllers/IPostController';

const route = Router();

export default (app: Router) => {
  app.use('/posts', route);

  const ctrl = Container.get(config.controllers.post.name) as IPostController;

  route.get('',
    (req, res, next) => ctrl.getPostsFeed(req, res, next)
  );

  route.get('/calculod',
    (req, res, next) => ctrl.getCalculoD(req, res, next)
  );


  route.post('',
    celebrate({
      body: Joi.object({
        userId: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
      })
    }),
    (req, res, next) => ctrl.createPost(req, res, next) 
  );

  route.put('/:id/comment',
    celebrate({
      params: Joi.object({
        id: Joi.string().required()
      }) ,
      body: Joi.object({
        userId: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
      }),
    }),
    (req, res, next) => ctrl.createComment(req, res, next) 
  );

  route.put('/:id/reaction',
    celebrate({
      params: Joi.object({
        id: Joi.string().required()
      }) ,
      body: Joi.object({
        userId: Joi.string().required(),
        reactionType: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createReaction(req, res, next) 
  );
};