import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { ReactionType } from "./ReactionType";

interface ReactionProps {
	userId : string;
	reactionType: ReactionType
  createdAt?: Date; 
  updatedAt?: Date; 
}

export class Reaction extends ValueObject<ReactionProps> {
  
  get userId(): string {
    return this.props.userId;
  }

  get reactionType(): ReactionType {
    return this.props.reactionType;
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

  public static create (props: ReactionProps): Result<Reaction> {

    const guardedProps = [
      { argument: props.userId, argumentName: 'userId' },
      { argument: props.reactionType, argumentName: 'reactionType' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Reaction>(guardResult.message);
    } else {

      const reaction = new Reaction({
        ...props
      });

      return Result.ok<Reaction>(reaction);
    }
  }

}