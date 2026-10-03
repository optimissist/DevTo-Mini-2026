import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostCard from './PostCard';

const post = { 
    url: "/link/for/test/",
    title: "My Post",
    description: "My Post Description",
    user: {
        username: "myUsername"
    },
    readable_publish_date: "Sept. 27",
    tag_list: [
        "react",
        "css",
        "html"
    ]
  };

function renderListing(overrides = {}) {
  const props = {
    post,
    setSavedTags: vi.fn(),
    ...overrides,
  };
  render(<PostCard {...props} />);
  return props;
}

describe('PostCard', () => {
  test('shows title, description and date in plain text', () => {
    renderListing();
    expect(screen.getByText('My Post')).toBeInTheDocument();
    expect(screen.getByText('My Post Description')).toBeInTheDocument();
    expect(screen.getByText('Sept. 27')).toBeInTheDocument();
  });

    test('links the title to the post', () => {
    renderListing();
    const link = screen.getByRole('link', { name: "My Post" }); //direct match
    expect(link).toHaveAttribute('href', '/link/for/test/');
  });

      test('links the username to the username profile', () => {
    renderListing();
       const link = screen.getByRole('link', { name: /myUsername/ }); //contains
    expect(link).toHaveAttribute('href', 'https://www.dev.to/myUsername');
    expect(link).toHaveAttribute('target', '_blank');
  });

    test('shows a button for each tag', () => {
    renderListing();
    expect(screen.getAllByRole('button')).toHaveLength(3);
    post.tag_list.forEach((tag) => {
      expect(screen.getByRole('button', { name: tag })).toBeInTheDocument();
    });
  });
  test('clicking a tag calls setSavedTags', async () => {
  const user = userEvent.setup();                                    
  const setSavedTags = vi.fn();                                           
  render(<PostCard post={post} setSavedTags={setSavedTags} />);

  await user.click(screen.getByRole('button', { name: 'react' })); 

  expect(setSavedTags).toHaveBeenCalledWith('react');                   
});
});