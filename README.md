# Dev.To Mini

A small, unofficial reader for [DEV](https://dev.to) posts. It shows the Dev.to home feed, searches posts by tag, and keeps a list of saved tags.

This is my version of Codecademy's Reddit client project. Reddit's unauthenticated `.json` endpoints have returned 403 since mid-2026, so the app uses the [Dev.to API](https://developers.forem.com/api) instead. The API needs no key for reading and allows requests from the browser, so there is no proxy or backend.

This project is not affiliated with DEV.

## Features

- **Home feed:** loads Dev.to articles when the app opens.
- **Post cards:** each post shows its title, description, author, publish date, and tags. The title opens the post on Dev.to in a new tab, and the author's name opens their Dev.to profile in a new tab.
- **Search by tag:** type a tag and click Search or press Enter to load that tag's posts.
- **Tag buttons:** clicking a tag on a post runs that tag's search in the same tab and puts the tag in the search field.
- **Saved tags:** Save adds the tag in the search field to the sidebar. Save is disabled when that tag is already saved. Saved tags are kept in `localStorage`, so they are still there on the next visit.
- **Saved tag buttons:** clicking a saved tag loads its posts and puts the tag in the search field. The x next to a tag removes it.
- **Home:** returns to the home feed and empties the search field. The home feed is cached in `sessionStorage`, so going Home does not request it again.
- **Clear:** empties the search field.
- **Loading and error states:** a message shows while posts are loading, and another shows when a request fails.

## Built with

- React
- Vite
- Redux Toolkit and react-redux
- Vitest, jsdom, and Testing Library (`@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`)

## Getting started

```bash
npm install
npm run dev
```

Vite prints the local address to open in the browser.

## Running the tests

```bash
npx vitest
```

## Project structure

```
src/
  App.jsx                 the only component that reads the store
  setupTests.js           loads jest-dom for the tests
  components/
    Header/               logo, search field, and the Search, Save, and Clear buttons
    PostCard/             one post: title, description, author, date, tag buttons
  features/
    postFeed/             heading and the list of PostCards
    savedTags/            Home button and the saved tags sidebar
  store/
    index.js              the store, with the keys devto and savedTags
    devtoSlice.js         loadPostList thunk, posts, loading and failure flags
    savedTagsSlice.js     saved tags, with saveTag and removeTag
```

Each test file sits next to the file it tests.

## How it works

- **State:** `App` reads the posts, the saved tags, and the loading and failure flags from the Redux store, and keeps the search term in its own state. `Header`, `PostFeed`, `PostCard`, and `SavedTags` receive everything through props.
- **Fetching:** the `loadPostList` thunk takes a path and requests `https://dev.to/api` plus that path. The home feed is `/articles`, and a tag search is `/articles/?tag=` followed by the tag.
- **Caching:** only the home feed is cached. When `/articles` is requested and the cache has posts, the thunk returns them without calling `fetch`.

## Tests

- **Slices:** the `savedTags` reducers and their `localStorage` writes, the `devto` reducer for pending, fulfilled, and rejected, and its caching rule.
- **Thunk:** `loadPostList` against a faked `fetch`, with and without a cached home feed, and with a failed request.
- **Components:** `Header`, `PostCard`, `PostFeed`, and `SavedTags` are rendered with props and fake functions. The tests check what each one shows and what it calls when the user clicks or types.
- **App:** rendered inside a Provider with a real store and a faked `fetch`. The tests check what the page shows and what is requested as the user searches, saves and removes tags, and goes Home.