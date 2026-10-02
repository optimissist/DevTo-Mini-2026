import savedTagsReducer, {saveTag, removeTag} from './savedTagsSlice';

describe('savedTagsSlice', () => {
  it('saves a new tag', () => {
    const startingState = { tags: ['react'] };
    const result = savedTagsReducer(startingState, saveTag('css'));
    expect(result.tags).toEqual(['react', 'css']);
  });
    it('does not save a duplicate tag', () => {
    const startingState = { tags: ['react'] };
    const result = savedTagsReducer(startingState, saveTag('react'));
    expect(result.tags).toEqual(['react']);
  });
  it('removes a new tag', () => {
    const startingState = { tags: ['react', 'css'] };
    const result = savedTagsReducer(startingState, removeTag('css'));
    expect(result.tags).toEqual(['react']);
  });

  it('saves tags to localStorage', () => {
  const startingState = { tags: ['react'] };
  savedTagsReducer(startingState, saveTag('css'));
  const stored = JSON.parse(localStorage.getItem('cachedTags'));
  expect(stored).toEqual(['react', 'css']);
});
   it('removes tags from localStorage', () => {
  const startingState = { tags: ['react', 'css'] };
  savedTagsReducer(startingState, removeTag('css'));
  const stored = JSON.parse(localStorage.getItem('cachedTags'));
  expect(stored).toEqual(['react']);
});
});
