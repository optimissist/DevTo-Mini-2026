import devToReducer, {loadPostList} from './devtoSlice';


describe('devToSlice', () => {
  it('sets fetching on pending', () => {
    const startingState = { posts: [], isLoading: false, failedToLoad: false };
    const result = devToReducer(startingState, loadPostList.pending());
    expect(result.isLoading).toBe(true);
    expect(result.failedToLoad).toBe(false);
  });

  it('stores the tags on fulfilled', () => {
    const startingState = { posts: [], isLoading: true, failedToLoad: false };
    const result = devToReducer(
      startingState,
      loadPostList.fulfilled(['react', 'css'], 'test-id', '/articles')
    );
    expect(result.isLoading).toBe(false);
    expect(result.posts).toEqual(['react', 'css']);
  });

  it('sets failed on rejected', () => {
    const startingState = { posts: [], isLoading: true, failedToLoad: false };
    const result = devToReducer(startingState, loadPostList.rejected());
    expect(result.isLoading).toBe(false);
    expect(result.failedToLoad).toBe(true);
  });
  it('caches posts when fetching the list', () => {
  const startingState = { posts: [], isLoading: true, failedToLoad: false };
  devToReducer(
    startingState,
    loadPostList.fulfilled(['html'], 'test-id', '/articles')
  );
  const stored = JSON.parse(sessionStorage.getItem('cachedPosts'));
  expect(stored).toEqual(['html']);
});

it('does not cache posts for other fetches', () => {
  sessionStorage.setItem('cachedPosts', JSON.stringify(['css']));
  const startingState = { posts: [], isLoading: true, failedToLoad: false };
  devToReducer(
    startingState,
    loadPostList.fulfilled(['react'], 'test-id', '/articles?tag=react')
  );
  const stored = JSON.parse(sessionStorage.getItem('cachedPosts'));
  expect(stored).toEqual(['css']);
});
});
