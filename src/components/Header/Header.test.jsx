import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from "./Header";


function renderHeader(overrides = {}) {
  const props = {
    isSavedTag: false,
    searchTerm: "react",
    searchTermChange: vi.fn(),
    setSaveTag: vi.fn(),
    handleSubmit: vi.fn(),
    clearSearchBar: vi.fn(),
    ...overrides,
  };
  render(<Header {...props} />);
  return props;
}

describe('Header', () => {
     test('input field shows searchTerm', () => {
        renderHeader();
        const field = screen.getByRole('textbox', {name: "Search Posts"}) //name = aria-label
        expect(field).toHaveValue('react');
      });
      test('disables save when the tag is saved', () => {
        renderHeader({ isSavedTag: true });
        expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
      });

        test('enables Save when the Tag is not saved', () => {
        renderHeader();
        expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled();
        });

        test('clicking search calls handleSubmit', async () => {
        const user = userEvent.setup();
        const {handleSubmit} = renderHeader();               
       await user.click(screen.getByRole('button', { name: 'Search' })); 

        expect(handleSubmit).toHaveBeenCalled();
        });

         test('clicking save calls setSaveTag', async () => {
        const user = userEvent.setup();
        const {setSaveTag} = renderHeader();               
       await user.click(screen.getByRole('button', { name: 'Save' })); 

        expect(setSaveTag).toHaveBeenCalled();
        });

         test('clicking clear calls clearSearchBar', async () => {
        const user = userEvent.setup();
        const {clearSearchBar} = renderHeader();               
       await user.click(screen.getByRole('button', { name: 'Clear' })); 

        expect(clearSearchBar).toHaveBeenCalled();
        });

        test('typing in the field calls searchTermChange', async () => {
  const user = userEvent.setup();
  const { searchTermChange } = renderHeader();
  await user.type(screen.getByRole('textbox', { name: 'Search Posts' }), 'react');
  expect(searchTermChange).toHaveBeenCalled();
});

test('pressing Enter in the field calls onApply', async () => {
  const user = userEvent.setup();
  const { handleSubmit } = renderHeader();
  await user.type(screen.getByRole('textbox', { name: 'Search Posts' }), '{Enter}');
  expect(handleSubmit).toHaveBeenCalled();
});
})


//When user types in the searchbar, header calls searchTermChange.
//When the user hits the save button, the header calls setSaveTag. 
//When the user hits clear, the Header calls clearSearchBar
//when the user hits enter, the header calls handleSubmit.
//when the user hits the search button, the header calls handleSubmit.

//When isSavedTag is true, the saved button is disabled
//When isSavedTag is false, the saved button is enabled
