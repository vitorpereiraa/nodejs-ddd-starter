import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface CommentProps {
	userId: string;
	content: string;
	tags: string[];
  createdAt?: Date; 
  updatedAt?: Date; 
}

export class Comment extends ValueObject<CommentProps> {
  
  get userId(): string {
    return this.props.userId;
  }

  get content(): string {
    return this.props.content;
  }

  get tags(): string[] {
    return this.props.tags;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private constructor (props) {
    super(props)
  }

  public static create (props: CommentProps): Result<Comment> {

    const guardedProps = [
      { argument: props.userId, argumentName: 'userId' }, // mandatory
      { argument: props.content, argumentName: 'content' }, // mandatory
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Comment>(guardResult.message);
    } else {

      const comment = new Comment({
        ...props
      });

      return Result.ok<Comment>(comment);
    }
  }

}