import { expect } from 'chai';
import { Post } from '../../../src/domain/Post';

describe('Ensure post is valid', () => {
  it('checks user id', () => {
    const post = {
      userId: null,
      content: null,
      tags: null,
    };
    const result = Post.create(post);
    expect(result.isFailure).to.equal(true);
  });

  it('checks user id', () => {
    const post = {
      userId: null,
      content: "new here",
      tags: null,
    };
    const result = Post.create(post);
    expect(result.isFailure).to.equal(true);
  });

  it('checks user id', () => {
    const post = {
      userId: null,
      content: "new here",
      tags:  ["java"],
    };
    const result = Post.create(post);
    expect(result.isFailure).to.equal(true);
  });

  it('checks user id', () => {
    const post = {
      userId: "11@isep.ipp.pt",
      content: "new here",
      tags:  ["java"],
    };
    const result = Post.create(post);
    expect(result.isSuccess).to.equal(true);
  });

  it('post works whitout tags', () => {
    const post = {
      userId: "11@isep.ipp.pt",
      content: "new here",
      tags:  null,
    };
    const result = Post.create(post);
    expect(result.isSuccess).to.equal(true);
  });

  it('post works whitout tags', () => {
    const post = {
      userId: "11@isep.ipp.pt",
      content: "new here",
      tags:  null,
    };
    const result = Post.create(post);
    expect(result.getValue().userId).to.equal(post.userId);
    expect(result.getValue().content).to.equal(post.content);
  });

  it('checks content', () => {
    const post = {
      userId: "11@isep.ipp.pt",
      content: null,
      tags:  ["java"],
    };
    const result = Post.create(post);
    expect(result.isFailure).to.equal(true);
  });


it('checks user id', () => {
    const post = {
      userId: "11@isep.ipp.pt",
      content: "new here",
      tags:  ["java"],
    };
    const result = Post.create(post);
    expect(result.getValue().userId).to.equal(post.userId);
    expect(result.getValue().content).to.equal(post.content);
    expect(result.getValue().tags).to.equal(post.tags);

  });

  it('new post', () => {
    const post = {
      userId: "112@isep.ipp.pt",
      content: "I'new here i want to make 1000 new friends!!",
      tags:  ["java", "Gamer", "AI", "Living the best Life"],
    };
    const result = Post.create(post);
    expect(result.isSuccess).to.equal(true);

  });
  
  it('new post', () => {
    const post = {
      userId: "112@isep.ipp.pt",
      content: "I'new here i want to make 1000 new friends!!",
      tags:  ["java", "Gamer", "AI", "Living the best Life"],
    };
    const result = Post.create(post);
    expect(result.getValue().userId).to.equal(post.userId);
    expect(result.getValue().content).to.equal(post.content);
    expect(result.getValue().tags).to.equal(post.tags);

  });
  
});
