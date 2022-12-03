import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Document, Model } from 'mongoose';

import { Post } from "../domain/Post";
import { IPostPersistence } from "../dataschema/IPostPersistence";
import { Reaction } from "../domain/Reaction";
import { Comment } from "../domain/Comment";
import { IPostDTO } from "../dto/IPostDTO";
import { ICommentDTO } from "../dto/ICommentDTO";
import { IReactionDTO } from "../dto/IReactionDTO";
import { ReactionType } from "../domain/ReactionType";

export class PostMap extends Mapper<Post> {
  
  public static toDTO( post: Post): IPostDTO {
    return {
      postId: post.id.toString(),
      userId: post.userId,
      content: post.content,
      tags: post.tags,
      reactions: post.reactions.map(r => {
        return { 
          userId: r.userId,
          reactionType: ReactionType[r.reactionType],
          createdAt: r.createdAt.toString(),
          updatedAt: r.updatedAt.toString(),
        } as IReactionDTO ;
      }),
      comments: post.comments.map(c => {
        return { 
          userId: c.userId,
          content: c.content,
          tags: c.tags,
          createdAt: c.createdAt.toString(),
          updatedAt: c.updatedAt.toString(),
        } as ICommentDTO ;
      }),
      createdAt: post.createdAt.toString(),
      updatedAt: post.updatedAt.toString(),
    } as IPostDTO;  
  }

  public static toDomain (post: any | Model<IPostPersistence & Document> ): Post {
    const postOrError = Post.create({
      userId: post.userId,
      content: post.content,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    },new UniqueEntityID(post.postId));

    if(postOrError.isFailure){
      console.log(postOrError.error);
      return null;
    } 

    const pos = postOrError.getValue() ;

    post.reactions.forEach( r => {
        pos.reactions.push(
          Reaction.create({
            userId : r.userId,
            reactionType: r.reactionType, 
            createdAt: r.createdAt,
            updatedAt: r.updatedAt
          }).getValue()
        );
      }
    );

    post.comments.forEach( c => {
      pos.comments.push(
        Comment.create({
          userId: c.userId,
          content: c.content,
          tags: c.tags,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt
        }).getValue()
      );
    });

    return pos;
  }

  public static toPersistence (post: Post): any {
    return {
      postId: post.id.toString(),
      userId: post.userId,
      content: post.content,
      tags: post.tags,
      reactions: post.reactions,
      comments: post.comments
    }
  }

  public static toPersistenceComment (comment: Comment): any {
    return {
      userId: comment.userId,
      content: comment.content,
      tags: comment.tags,
    }
  }

  public static toPersistenceReaction (reaction: Reaction): any {
    return {
      userId: reaction.userId,
      reactionType: reaction.reactionType,
    }
  }
}