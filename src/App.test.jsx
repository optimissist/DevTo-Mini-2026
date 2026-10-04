import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import savedTagsReducer from './store/savedTagsSlice';
import devtoReducer from './store/devtoSlice';
import App from './App';


const postList = [ //has to match the prop
    { 
    id:'Post0001',
    url: "/link/for/test/1/",
    title: "My Post 1",
    description: "My Post Description 1",
    user: {
        username: "myUsername1"
    },
    readable_publish_date: "Jan. 01",
    tag_list: [
        "react",
        "css",
        "html"
    ]
  },
  { 
    id: 'Post0002',
    url: "/link/for/test/2/",
    title: "My Post 2",
    description: "My Post Description 2",
    user: {
        username: "myUsername2"
    },
    readable_publish_date: "Feb. 02",
    tag_list: [
        "javascript",
        "redux",
        "git"
    ]
  }
];

function makeStore() {
  return configureStore({
    reducer: { savedTags: savedTagsReducer, devto: devtoReducer },
  });
}


function renderApp() {
  render(
    <Provider store={makeStore()}>
      <App />
    </Provider>
  );
}

describe ("App", () => {
      beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: async () => postList }));
  });

   beforeEach(() => {
    sessionStorage.clear();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: async () => postList }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

    test('shows the loading message while the posts are loading', async () => {
    renderApp();
    expect(screen.getByText('Is Loading...')).toBeInTheDocument();
    await screen.findByText('My Post 1');
  });

  test('shows posts once post list is loaded', async () => {
    renderApp();
    expect(await screen.findByText('My Post 1')).toBeInTheDocument();
    expect(screen.getByText('My Post 2')).toBeInTheDocument();
  });

  test('shows the failure message when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    renderApp();
    expect(await screen.findByText('This Failed To Load')).toBeInTheDocument();
  });

  test('asks for all posts on first load', async () => {
    renderApp();
    await screen.findByText('My Post 1');
    expect(fetch).toHaveBeenCalledWith('https://dev.to/api/articles');
  });

    test('Typing a search term and clicking Search fetches that search termss posts', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText('My Post 1');

    await user.type(screen.getByRole('textbox', { name: 'Search Posts' }), 'react');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(fetch).toHaveBeenCalledWith('https://dev.to/api/articles/?tag=react');
    await screen.findByText('react');
  });

    test('Typing a search term and hitting enter fetches that search termss posts', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText('My Post 1');

    await user.type(screen.getByRole('textbox', { name: 'Search Posts' }), 'react{Enter}');

    expect(fetch).toHaveBeenCalledWith('https://dev.to/api/articles/?tag=react');
    await screen.findByText('react');
  });


  test('clicking Clear empties the field', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText('My Post 1');
    const field = screen.getByRole('textbox', { name: 'Search Posts' });

    await user.type(field, 'react');
    await user.click(screen.getByRole('button', { name: 'Clear' }));

    expect(field).toHaveValue('');
  });


  test('save tag adds the tag to the saved tags list', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText('My Post 1');

    await user.type(screen.getByRole('textbox', { name: 'Search Posts' }), 'mocha');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByRole('button', { name: 'mocha' })).toBeInTheDocument();
  });

    test('saving a tag with an empty field adds nothing', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText('My Post 1');

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByRole('button', { name: /Remove/ })).not.toBeInTheDocument();
  });

  test('Save is disabled when the tag is already saved', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText('My Post 1');
    const pin = screen.getByRole('button', { name: 'Save' });

    await user.type(screen.getByRole('textbox', { name: 'Search Posts' }), 'react');
    expect(pin).toBeEnabled();
    await user.click(pin);

    expect(pin).toBeDisabled();
  });

    test('in the sidebar fetches posts related to that search term and puts the tag in the field', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText('My Post 1');
    const field = screen.getByRole('textbox', { name: 'Search Posts' });

    await user.type(field, 'java');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    await user.click(screen.getByRole('button', { name: 'java' }));

    expect(fetch).toHaveBeenCalledWith('https://dev.to/api/articles/?tag=java');
    expect(field).toHaveValue('java');
    await screen.findByText('My Post 1');
  });

  test('clicking x removes tag off saved tags list', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText('My Post 1');
    await user.type(screen.getByRole('textbox', { name: 'Search Posts' }), 'jest');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    await user.click(screen.getByRole('button', { name: /Remove/ }));

    expect(screen.queryByRole('button', { name: 'jest' })).not.toBeInTheDocument();
  });

     test('clicking home does not call fetch again and clears the search term.', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText('My Post 1');
    const field = screen.getByRole('textbox', { name: 'Search Posts' });

    await user.type(field, 'react');
    await user.click(screen.getByRole('button', { name: 'Home' }));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenLastCalledWith('https://dev.to/api/articles');
    expect(field).toHaveValue('');
    await screen.findByText('My Post 1');
  });

  test('clicking a tag in a post will fetch posts and puts the tag in the field.', async () => {
  const user = userEvent.setup();
  renderApp();
  await screen.findByText('My Post 1');
  const field = screen.getByRole('textbox', { name: 'Search Posts' });

  await user.click(screen.getByRole('button', { name: 'react' }));

  expect(fetch).toHaveBeenCalledWith('https://dev.to/api/articles/?tag=react');
  expect(field).toHaveValue('react');
  await screen.findByText('My Post 1');
});

})

// While the posts are loading, it shows "Is Loading..."
// Once the posts load, it shows the post list.
// When the request fails, it shows "This Failed To Load".
// On first load, it asks for all posts.
// Typing a search term and clicking Search asks for that search terms's posts.
// Typing a search term and pressing Enter asks for that search terms's posts
// Clicking Clear empties the field.
// Typing a Search Term and clicking save adds that term to the saved tags list list.
// saving a search bar with an empty field adds nothing.
// save tag is disabled when the tag is already saved.
// Clicking a saved tag in the sidebar fetches posts related to that search term and puts the tag in the field.
//clicking a tag in a post will fetch posts and puts the tag in the field.
// Clicking x takes that tag off the saved tags list.
// clicking Home does not call fetch again and clears the search term.