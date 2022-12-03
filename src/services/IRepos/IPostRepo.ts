import { Comment } from '../../domain/Comment';
import { Repo } from '../../core/infra/Repo';
import { Post } from '../../domain/Post';
import { PostId } from '../../domain/PostId';
import { Reaction } from '../../domain/Reaction';

export default interface IPostRepo extends Repo<Post> {
  save(post: Post): Promise<Post>;
  findByUser(userId: string): Promise<Post[]>;
  findByUserWithReactionsByUser(userFromId : string, userToId : string): Promise<Post[]>;
  findByDomainId(postId: PostId | string): Promise<Post>;
  updateComments(postId: PostId | string, comment: Comment): Promise<Post>;
  updateReactions(postId: PostId | string, reaction: Reaction): Promise<Post>;
}
