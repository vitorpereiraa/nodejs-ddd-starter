import { Request, Response, NextFunction } from 'express';

export default interface IPostController {
  getPostsFeed(req: Request, res: Response, next: NextFunction);
  getCalculoD(req: Request, res: Response, next: NextFunction);
  createPost(req: Request, res: Response, next: NextFunction);
  createComment(req: Request, res: Response, next: NextFunction);
  createReaction(req: Request, res: Response, next: NextFunction);
}
