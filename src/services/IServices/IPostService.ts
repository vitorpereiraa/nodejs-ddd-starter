import { Result } from "../../core/logic/Result";
import { ICreatingCommentDTO } from "../../dto/ICreatingCommentDTO";
import { ICreatingPostDTO } from "../../dto/ICreatingPostDTO";
import { ICreatingReactionDTO } from "../../dto/ICreatingReactionDTO";
import { IPostDTO } from "../../dto/IPostDTO";

export default interface IPostService  {
  getPosts(userId: string): Promise<Result<IPostDTO[]>>;
  getCalculoD(userFromId,userToId):Promise<Result<number>>;
  createPost(creatingPostDto: ICreatingPostDTO): Promise<Result<ICreatingPostDTO>>;
  addComment(postId: string,commentDto: ICreatingCommentDTO): Promise<Result<ICreatingPostDTO>>;
  addReaction(postId: string,reactionDto: ICreatingReactionDTO): Promise<Result<ICreatingPostDTO>>;

}
