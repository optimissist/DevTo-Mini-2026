import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SavedTags from './SavedTags';


function renderSavedTags(overrides = {}) {
  const props = {
    tagList: ["react", "css", "html"], 
    setSavedTags: vi.fn(), 
    setTagToRemove: vi.fn(), 
    sendHome: vi.fn(),
    ...overrides,
  };
  render(<SavedTags {...props} />);
  return props;
}


describe('SavedTags', () => {
    test('always show "Saved Tags" heading', () => {
        renderSavedTags();
        expect(screen.getByRole('heading', { name: 'Saved Tags' })).toBeInTheDocument();
    })
    test('always show Home button', () => {
        renderSavedTags();
        expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    })
      test('clicking tag calls setSavedTags', async () => {
            const user = userEvent.setup();
            const {setSavedTags} = renderSavedTags();               
           await user.click(screen.getByRole('button', { name: 'react' })); 
    
            expect(setSavedTags).toHaveBeenCalledWith('react');
            });

             test('clicking "x" calls setTagToRemove', async () => {
            const user = userEvent.setup();
            const {setTagToRemove} = renderSavedTags();               
           await user.click(screen.getByRole('button', { name: 'Remove react' })); 
    
            expect(setTagToRemove).toHaveBeenCalledWith('react');
            });

             test('clicking Home calls sendHome', async () => {
            const user = userEvent.setup();
            const {sendHome} = renderSavedTags();               
           await user.click(screen.getByRole('button', { name: 'Home' })); 
    
            expect(sendHome).toHaveBeenCalled();
            });

            test('shows a tag button and a x button for a tag', () => {
  renderSavedTags();
  expect(screen.getByRole('button', { name: 'react' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Remove react' })).toBeInTheDocument();
});
})


//savedTags will always display the title Saved Tags
// savedTags will always display a "home" button 
//each tag has two buttons, one named for the other tag, the other  is named remove.
// when a user hits the x button, saved tags will call setTagToRemove use toHaveBeenCalledWith (tag)
// when a user clicks a tag, saved tags calls setSavedTags use toHaveBeenCalledWith (tag)
// when a user clicks the home button, saved tags calls send home use toHaveBeenCalled