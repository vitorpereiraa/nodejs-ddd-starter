import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import { Result } from '../core/logic/Result';

import config from '../../config';
import IPostController from './IControllers/IPostController';
import IPostService from '../services/IServices/IPostService';
import { ICreatingPostDTO } from '../dto/ICreatingPostDTO';
import { IPostDTO } from '../dto/IPostDTO';
import { ICreatingCommentDTO } from '../dto/ICreatingCommentDTO';
import { ICreatingReactionDTO } from '../dto/ICreatingReactionDTO';


@Service()
export default class PostController implements IPostController {
  constructor(@Inject(config.services.post.name) private postServiceInstance: IPostService) { }

  //na forma /api/posts/calculod?userfrom=12@isep.ipp.pt&userto=13@isep.ipp.pt
  public async getCalculoD(req: Request, res: Response, next: NextFunction) {
    try{
      var userFromId : string = req.query.userfrom.toString();
      var userToId : string = req.query.userto.toString();

      const postsOrError = (await this.postServiceInstance.getCalculoD(userFromId,userToId)) as Result<number>;      

      if (postsOrError.isFailure) {
        return res.status(404).send();
      }

      return res.json(postsOrError.getValue()).status(200);
    } catch (e) {
      return next(e);
    }


  }


  //na forma /api/posts?userid=12@isep.ipp.pt
  public async getPostsFeed(req: Request, res: Response, next: NextFunction) {
    try {
      var userId : string = req.query.userid.toString();
      
      const postsOrError = (await this.postServiceInstance.getPosts(userId)) as Result<IPostDTO[]>;      

      if (postsOrError.isFailure) {
        return res.status(404).send();
      }

      const postsArray : IPostDTO[] = postsOrError.getValue();

      return res.json(postsArray).status(200);
    } catch (e) {
      return next(e);
    }
  }


  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = (await this.postServiceInstance.createPost(req.body as ICreatingPostDTO)) as Result<IPostDTO>;

      if (postOrError.isFailure) {
        return res.status(402).send();
      }

      const postDTO = postOrError.getValue();
      return res.json(postDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = (await this.postServiceInstance.addComment(req.params.id, req.body as ICreatingCommentDTO)) as Result<IPostDTO>;

      if (postOrError.isFailure) {
        return res.status(402).send();
      }

      const postDTO = postOrError.getValue();
      return res.json(postDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async createReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = (await this.postServiceInstance.addReaction(req.params.id, req.body as ICreatingReactionDTO)) as Result<IPostDTO>;

      if (postOrError.isFailure) {
        return res.status(402).send();
      }

      const postDTO = postOrError.getValue();
      return res.json(postDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }


}
