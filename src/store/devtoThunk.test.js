import { configureStore } from '@reduxjs/toolkit';
import devtoReducer, { loadPostList } from './devtoSlice';

const makeStore = () => configureStore({ reducer: { devto: devtoReducer } });

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test('reads /article cache instead of fetch', async () => {
  sessionStorage.setItem('cachedPosts', JSON.stringify([{ name: 'react' }]));
  const fakeFetch = vi.fn();
  vi.stubGlobal('fetch', fakeFetch);

  const result = await makeStore().dispatch(loadPostList('/articles'));

  expect(fakeFetch).not.toHaveBeenCalled();
  expect(result.payload).toEqual([{ name: 'react' }]);
});

test('fetches another tag even when the cache has posts', async () => {
  sessionStorage.setItem('cachedPosts', JSON.stringify([{ name: 'css' }]));
  const fakeFetch = vi.fn().mockResolvedValue({
    json: async () => [{ name: 'html' }],
  });
  vi.stubGlobal('fetch', fakeFetch);

  const result = await makeStore().dispatch(loadPostList('/articles/?tag=html'));

  expect(fakeFetch).toHaveBeenCalledWith('https://dev.to/api/articles/?tag=html');
  expect(result.payload).toEqual([{ name: 'html' }]);
});

test('fetches /articles when the cache is empty', async () => {
  const fakeFetch = vi.fn().mockResolvedValue({
    json: async () => [{ name: 'react' }],
  });
  vi.stubGlobal('fetch', fakeFetch);

  const result = await makeStore().dispatch(loadPostList('/articles'));

  expect(fakeFetch).toHaveBeenCalledWith('https://dev.to/api/articles');
  expect(result.payload).toEqual([{ name: 'react' }]);
});



test('rejects when fetch fails', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

  const result = await makeStore().dispatch(loadPostList('/articles'));

  expect(result.type).toBe(loadPostList.rejected.type);
});

//'/articles' with a filled cache: returns the cached posts, and fetch is never called.
//'/articles' with an empty cache: calls fetch with the /articles URL and returns the result.
//A tag path with a filled cache: calls fetch with the tag URL anyway.
//fetch fails: the result is the rejected action.