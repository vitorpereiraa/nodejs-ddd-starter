import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';

import IPostRepo from '../services/IRepos/IPostRepo';
import { IPostPersistence } from '../dataschema/IPostPersistence';
import { Post } from '../domain/Post';
import { PostId } from '../domain/PostId';
import { PostMap } from '../mappers/PostMap';
import { Comment } from '../domain/Comment';
import { Reaction } from '../domain/Reaction';

@Service()
export default class PostRepo implements IPostRepo {
  private models: any;

  constructor(@Inject('postSchema') private postSchema: Model<IPostPersistence & Document>) { }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async findByUser(userId: string): Promise<Post[]> {
    const query = { "userId": userId };
    const postsDocuments = await this.postSchema.find(query).sort({createdAt:-1});

    var posts : Post[] = [];

    for (var i = 0; i < postsDocuments.length; i++) {
      var p : Post = PostMap.toDomain(postsDocuments[i]);
      posts.push(p);
    }

    return posts;

  }

  public async findByUserWithReactionsByUser(userFromId : string, userToId : string): Promise<Post[]>{
    const query = { "userId": userFromId, "reactions.userId" : userToId };
    const postsDocuments = await this.postSchema.find(query).sort({createdAt:-1});

    var posts : Post[] = [];

    for (var i = 0; i < postsDocuments.length; i++) {
      var p : Post = PostMap.toDomain(postsDocuments[i]);
      posts.push(p);
    }

    return posts;
  }



  public async exists(post: Post): Promise<boolean> {
    const idX = post.id instanceof PostId ? (<PostId>post.id).toValue() : post.id;

    const query = { postId: idX };
    const postDocument = await this.postSchema.findOne(query as FilterQuery<IPostPersistence & Document>);

    return !!postDocument === true;
  }

  public async save(post: Post): Promise<Post> {
    const query = { postId: post.id.toString() };

    const postDocument = await this.postSchema.findOne(query);

    const rawPost: any = PostMap.toPersistence(post);

    try {
      if (postDocument === null) {
        const postCreated = await this.postSchema.create(rawPost);

        return PostMap.toDomain(postCreated);
      } else {

        postDocument.content = rawPost.content;
        postDocument.tags = rawPost.tags;

        await postDocument.save();

        return PostMap.toDomain(post);
      }
    } catch (err) {
      throw err;
    }
  }

  public async updateComments(postId: PostId | string, comment: Comment): Promise<Post> {

    const query = { postId: postId };
    const postRecord = await this.postSchema.findOne(query as FilterQuery<IPostPersistence & Document>);

    if(!postRecord) return null;

    try {
      postRecord.comments.push(PostMap.toPersistenceComment(comment));
      await postRecord.save();
      return PostMap.toDomain(postRecord);
    } catch (err) {
      throw err;
    }
  }

  public async updateReactions(postId: string | PostId, reaction: Reaction): Promise<Post> {
    const query = { postId: postId };
    const postRecord = await this.postSchema.findOne(query as FilterQuery<IPostPersistence & Document>);

    if(!postRecord) return null;

    try {
      postRecord.reactions.push(PostMap.toPersistenceReaction(reaction));
      await postRecord.save();
      return PostMap.toDomain(postRecord);
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(postId: PostId | string): Promise<Post> {
    const query = { postId: postId };
    const postRecord = await this.postSchema.findOne(query as FilterQuery<IPostPersistence & Document>);

    if (postRecord != null) {
      return PostMap.toDomain(postRecord);
    } else return null;
  }
}
