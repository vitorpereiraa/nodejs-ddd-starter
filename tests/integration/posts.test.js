const axios = require('axios');
const index = require('../axios');

var postsDTO = {};
var dataComplete = {};
var postById = {};
var postBody = {};

describe('DriverType Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('get all driverTypes using DTO', async () => {
    axios.get = jest.fn().mockResolvedValue(dataDTO);
    const driverType = await index.getAllDriverTypesDTO();
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes/));
    expect(driverType).toEqual(dataDTO);
  });

  test('get all posts', async () => {
    console.log('yo');
    axios.get = jest.fn().mockResolvedValue(dataDTO);
    const driverType = await index.getAllDriverTypesDTO();
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes/));
    expect(driverType).toEqual(dataDTO);
  });

  test('get all driverTypes complete information', async () => {
    axios.get = jest.fn().mockResolvedValue(dataComplete);
    const driverType = await index.getAllDriverTypes();
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes\/complete/));
    expect(driverType).toEqual(dataComplete);
  });

  test('get driverTypes by id equal', async () => {
    axios.get = jest.fn().mockResolvedValue(driverTypeById);
    var id = 'line_test1';
    const driverType = await index.getDriverTypeById(id);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes\/.+/));
    expect(driverType).toEqual(driverTypeById);
  });

  test('get driverTypes by id not equal', async () => {
    axios.get = jest.fn().mockResolvedValue(driverTypeById);
    var id = 'fake driverType id';
    var expectedName = 'fake name';
    const driverType = await index.getDriverTypeById(id);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes\/.+/));
    expect(driverType.name).not.toEqual(expectedName);
  });

  test('get driverTypes by id error', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error('Not Found'));
    var id = 'not found';
    const driverType = await index.getDriverTypeById(id);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes\/.+/));
    expect(driverType).not.toEqual(driverTypeById);
    expect(driverType).toMatchObject(new Map());
  });

  test('post driverType', async () => {
    axios.post = jest.fn().mockResolvedValue(postBody);
    const postedDriverType = await index.postDriverType(postBody);
    await expect(index.postDriverType(postBody)).not.toEqual(new Map());
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes/), postBody);
    expect(postedDriverType).toEqual(postBody);
  });

  test('post driverType null post body', async () => {
    axios.post = jest.fn().mockImplementation(() => {
      throw new Error('Null Post Body');
    });
    const postedDriverType = await index.postDriverType(null);
    await expect(index.postDriverType(null)).toStrictEqual(Promise.resolve());
    expect(axios.post).not.toHaveBeenCalled();
    expect(axios.post).toThrow('Null Post Body');
  });
});
