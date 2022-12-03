import { expect } from 'chai';
import { Reaction } from '../../../src/domain/Reaction';
import {ReactionType} from '../../../src/domain/ReactionType';

describe('Ensure reaction is valid', () => {
  it('checks user id', () => {
    const reaction = {
      userId: null,
      reactionType: null,
    };
    const result = Reaction.create(reaction);
    expect(result.isFailure).to.equal(true);
  });

  it('checks user id', () => {
    const reaction = {
      userId: null,
      reactionType: ReactionType.LIKE,
    };
    const result = Reaction.create(reaction);
    expect(result.isFailure).to.equal(true);
  });
  

  it('checks user id', () => {
    const reaction = {
      userId: null,
      reactionType: ReactionType.DISLIKE,
    };
    const result = Reaction.create(reaction);
    expect(result.isFailure).to.equal(true);
  });

  it('checks user id', () => {
    const reaction = {
      userId: "11@isep.ipp.pt",
      reactionType: ReactionType.DISLIKE,
    };
    const result = Reaction.create(reaction);
    expect(result.isSuccess).to.equal(true);
  });

  it('checks user id', () => {
    const reaction = {
      userId: "11@isep.ipp.pt",
      reactionType: ReactionType.LIKE,
    };
    const result = Reaction.create(reaction);
    expect(result.isSuccess).to.equal(true);
  });

  it('reaction doesnt work whitout reaction type', () => {
    const reaction = {
      userId: "11@isep.ipp.pt",
      reactionType: null,
    };
    const result = Reaction.create(reaction);
    expect(result.isFailure).to.equal(true);
  });

  it('reaction works like', () => {
    const reaction = {
      userId: "11@isep.ipp.pt",
      reactionType: ReactionType.LIKE,
    };
    const result = Reaction.create(reaction);
    expect(result.getValue().userId).to.equal(reaction.userId);
    expect(result.getValue().reactionType).to.equal(ReactionType.LIKE);
  });

  it('reaction works dislike', () => {
    const reaction = {
      userId: "11@isep.ipp.pt",
      reactionType: ReactionType.DISLIKE,
    };
    const result = Reaction.create(reaction);
    expect(result.getValue().userId).to.equal(reaction.userId);
    expect(result.getValue().reactionType).to.equal(ReactionType.DISLIKE);
  });

  it('reaction not expecting like', () => {
    const reaction = {
      userId: "11@isep.ipp.pt",
      reactionType: ReactionType.DISLIKE,
    };
    const result = Reaction.create(reaction);
    expect(result.getValue().userId).to.equal(reaction.userId);
    expect(result.getValue().reactionType).to.not.have.property(ReactionType.LIKE);
  });

  it('reaction not expecting dislike', () => {
    const reaction = {
      userId: "11@isep.ipp.pt",
      reactionType: ReactionType.LIKE,
    };
    const result = Reaction.create(reaction);
    expect(result.getValue().userId).to.equal(reaction.userId);
    expect(result.getValue().reactionType).to.not.have.property(ReactionType.DISLIKE);
  });

  it('checks reaction type', () => {
    const reaction = {
      userId: "11@isep.ipp.pt",
      reactionType: null,
    };
    const result = Reaction.create(reaction);
    expect(result.isFailure).to.equal(true);
  });


it('checks user id', () => {
    const reaction = {
      userId: "11@isep.ipp.pt",
      reactionType: ReactionType.LIKE,
    };
    const result = Reaction.create(reaction);
    expect(result.getValue().userId).to.equal(reaction.userId);
    expect(result.getValue().reactionType).to.equal(ReactionType.LIKE);

  });
  
  it('new reaction', () => {
    const reaction = {
      userId: "112@isep.ipp.pt",
      reactionType: ReactionType.DISLIKE,
    };
    const result = Reaction.create(reaction);
    expect(result.getValue().userId).to.equal(reaction.userId);
    expect(result.getValue().reactionType).to.equal(ReactionType.DISLIKE);

  });

});
