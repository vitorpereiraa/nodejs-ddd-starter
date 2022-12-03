import { expect } from 'chai';
import PostRepo from '../../../src/repos/postRepo';

// jest.mock('../../../src/repos/postRepo');

describe('Sample Service Test', () => {
  it('Create Post', () => {
    const post = {
      userId: 'joana@isep.pt',
      content: 'je suis un stylo',
      tags: [],
    };
    console.log('aqui');
    // const service = new PostService(new PostRepo(null));
    // return service.createPost(post).then((data) => expect(data).toEqual(post));
  });
});
