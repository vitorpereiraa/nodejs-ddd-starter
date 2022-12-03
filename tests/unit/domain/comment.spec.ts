import { expect } from 'chai';
import { Comment } from '../../../src/domain/Comment';

describe('Ensure comment is valid', () => {
  it('checks all data', () => {
    const comment = {
      userId: "test@test.com",
      content: "testing module",
      tags: ["tester", "test"],
    };
    const result = Comment.create(comment);
    expect(result.isSuccess).to.equal(true);
  });
});

describe('Ensure userID are equal', () => {
  it('checks user id', () => {
    const comment = {
      userId: "test@test.com",
      content: "testing module",
      tags: ["tester", "test"],
    };
    const result = Comment.create(comment);
    expect(result.getValue().userId).to.equal(comment.userId);
  });
});

describe('Ensure tags are equal', () => {
  it('checks tags', () => {
    const comment = {
      userId: "test@test.com",
      content: "testing module",
      tags: ["tester", "test"],
    };
    const result = Comment.create(comment);
    expect(result.getValue().tags).to.equal(comment.tags);
  });
});

describe('Ensure content are equal', () => {
  it('checks content', () => {
    const comment = {
      userId: "test@test.com",
      content: "testing module",
      tags: ["tester", "test"],
    };
    const result = Comment.create(comment);
    expect(result.getValue().content).to.equal(comment.content);
  });
});

describe('Ensure comment is not valid with null arguments', () => {
  it('checks all data', () => {
    const comment = {
      userId: null,
      content: null,
      tags: null,
    };
    const result = Comment.create(comment);
    expect(result.isFailure).to.equal(true);
  });
});

describe('Ensure comment is not valid without mandatory data (userID and Content)', () => {
  it('checks user id and content', () => {
    const comment = {
      userId: null,
      content: null,
      tags: ["tester", "test"],
    };
    const result = Comment.create(comment);
    expect(result.isFailure).to.equal(true);
  });
});

describe('Ensure comment is not valid when missing userID', () => {
  it('checks user id existence', () => {
    const comment = {
      userId: null,
      content: "testing module",
      tags: ["tester", "test"],
    };
    const result = Comment.create(comment);
    expect(result.isFailure).to.equal(true);
  });
});

describe('Ensure comment is not valid when missing content', () => {
  it('checks content existence', () => {
    const comment = {
      userId: "test@test.com",
      content: null,
      tags: ["tester", "test"],
    };
    const result = Comment.create(comment);
    expect(result.isFailure).to.equal(true);
  });
});

describe('Ensure comment is valid whith tags null', () => {
  it('checks tags is null', () => {
    const comment = {
      userId: "test@test.com",
      content: "testing module",
      tags: null,
    };
    const result = Comment.create(comment);
    expect(result.isSuccess).to.equal(true);
  });
});
