import { Service, Inject } from 'typedi';
import { Result } from "../core/logic/Result";
import config from "../../config";

import IPostService from "./IServices/IPostService";
import IPostRepo from './IRepos/IPostRepo';
import { ICreatingPostDTO } from '../dto/ICreatingPostDTO';
import { IPostDTO } from '../dto/IPostDTO';
import { Post } from '../domain/Post';
import { Comment } from '../domain/Comment';
import { PostMap } from '../mappers/PostMap';
import { Reaction } from '../domain/Reaction';
import { ICreatingCommentDTO } from '../dto/ICreatingCommentDTO';
import { ICreatingReactionDTO } from '../dto/ICreatingReactionDTO';
import { ReactionType } from '../domain/ReactionType';
import { User } from '../domain/user';

@Service()
export default class PostService implements IPostService {
  constructor(
      @Inject(config.repos.post.name) private postRepo : IPostRepo
  ) {}

  public async getPosts(userId: string): Promise<Result<IPostDTO[]>> {
    var posts:Post[] = await this.postRepo.findByUser(userId);

    var dtos : IPostDTO[] = [];
    for (var i = 0; i < posts.length; i++) {
      dtos.push(PostMap.toDTO(posts[i]));
    }     

    return Result.ok<any>( dtos );

  }

  public async getCalculoD(userFromId : string, userToId : string):Promise<Result<number>>{
    var posts:Post[] = await this.postRepo.findByUserWithReactionsByUser(userFromId, userToId);

    var calculoD : number = 0;

    posts.forEach( p => p.reactions.forEach(r => {
                          if (r.userId==userToId){
                            calculoD += r.reactionType==0 ? 1 : -1;
                          } 
                        })
                  );

    return Result.ok<any>(calculoD);
  }


  public async createPost(creatingPostDTO: ICreatingPostDTO): Promise<Result<IPostDTO>> {

    try {
      if(!(await this.isUserValid(creatingPostDTO.userId)))
        return Result.fail<IPostDTO>("invalid user");

      const postOrError = Post.create( creatingPostDTO );

      if (postOrError.isFailure) {
        return Result.fail<IPostDTO>(postOrError.errorValue());
      }

      const postResult = postOrError.getValue();

      const persistedPost = await this.postRepo.save(postResult);
      const postDtoResult = PostMap.toDTO( persistedPost ) as IPostDTO;
      return Result.ok<any>( postDtoResult );
    }catch(e){
      throw e;
    }
  }

  public async addComment(postId: string, commentDto: ICreatingCommentDTO): Promise<Result<IPostDTO>> {

    try {
      if(!(await this.isUserValid(commentDto.userId)))
        return Result.fail<IPostDTO>("invalid user");
      
      const commentOrError = Comment.create(commentDto);

      if (commentOrError.isFailure) {
        return Result.fail<IPostDTO>(commentOrError.errorValue());
      }

      const commentResult = commentOrError.getValue();

      const post = await this.postRepo.updateComments(postId,commentResult);

      const postDtoResult = PostMap.toDTO( post ) as IPostDTO;
      return Result.ok<IPostDTO>( postDtoResult )
    }catch(e){
      throw e;
    }
  }

  public async addReaction(postId: string, reactionDto: ICreatingReactionDTO): Promise<Result<ICreatingPostDTO>> {

    try{
      if(!(await this.isUserValid(reactionDto.userId)))
        return Result.fail<IPostDTO>("invalid user");

      const reactionOrError = Reaction.create({
        userId: reactionDto.userId,
        reactionType: ReactionType[reactionDto.reactionType] 
      });

      if (reactionOrError.isFailure) {
        return Result.fail<IPostDTO>(reactionOrError.errorValue());
      }

      const reactionResult = reactionOrError.getValue();

      const post = await this.postRepo.updateReactions(postId,reactionResult);

      const postDtoResult = PostMap.toDTO( post ) as IPostDTO;
      return Result.ok<IPostDTO>( postDtoResult )
    }catch(e){
      throw e;
    }
  }

  public async isUserValid(userId: string): Promise<Boolean>{
    return true;
    // DA-100 Delvys verify if users exist in sitemodule
    // if GET api/users/example@email.com is 200 return true, else if 404 (NOT FOUND) return false
  }
}
