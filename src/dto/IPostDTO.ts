import { ICommentDTO } from "./ICommentDTO";
import { IReactionDTO } from "./IReactionDTO";

export interface IPostDTO {
  postId: string;
  userId: string;
  content: string;
  tags: string[]; 
  reactions: IReactionDTO[];
  comments: ICommentDTO[];
  createdAt: string;
  updatedAt: string;
}