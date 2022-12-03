import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

import { Reaction } from "./Reaction";
import { Comment } from "./Comment";

interface PostProps {
  userId: string;
  content: string;
  tags: string[]; 
  reactions?: Reaction[]; 
  comments?: Comment[]; 
  createdAt?: Date; 
  updatedAt?: Date; 
}

export class Post extends AggregateRoot<PostProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): string {
    return this.props.userId;
  }

  get content (): string{
    return this.props.content;
  }

  get tags (): string[] {
    return this.props.tags;
  }

  get reactions (): Reaction[] {
    return this.props.reactions;
  }

  get comments (): Comment[] {
    return this.props.comments;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private constructor (props: PostProps, id?: UniqueEntityID) {
    super(props, id);
    this.props.reactions = [];
    this.props.comments = [];
  }

 public static create (props: PostProps, id?: UniqueEntityID): Result<Post> {

    const guardedProps = [
      { argument: props.userId, argumentName: 'userId' }, // mandatory
      { argument: props.content, argumentName: 'content' }, // mandatory
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Post>(guardResult.message)
    }     
    else {
      const post = new Post({
        ...props
      }, id);

      return Result.ok<Post>(post);
    }
  }
}
