import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostFeed from './PostFeed';

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

function renderPostFeed(overrides = {}) {
  const props = {
    postList, 
    setSavedTags: vi.fn(), 
    ...overrides,
  };
  render(<PostFeed {...props} />);
  return props;
}

describe('PostFeed', () => {
 test('always show PostFeed heading', () => {
        renderPostFeed();
        expect(screen.getByRole('heading', { name: 'Dev.to Posts' })).toBeInTheDocument();
    })
     test('links the heading to the dev.to', () => {
        renderPostFeed();
        const link = screen.getByRole('link', { name: "Dev.to" }); 
        expect(link).toHaveAttribute('href', 'https://www.dev.to');
        expect(link).toHaveAttribute('target', '_blank')
      });
        test('clicking tag calls setSavedTags', async () => {
                  const user = userEvent.setup();
                  const {setSavedTags} = renderPostFeed();               
                 await user.click(screen.getByRole('button', { name: 'react' })); 
          
                  expect(setSavedTags).toHaveBeenCalledWith('react');
                  });
        test('shows each post in postList', () => {
  renderPostFeed();
  expect(screen.getByRole('link', { name: 'My Post 1' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'My Post 2' })).toBeInTheDocument();
});
})

// Post feed will always display a header
// The main heading has a link 
// there is a subheading
// there is a sub-sub-heading
// ostFeed shows that post's title