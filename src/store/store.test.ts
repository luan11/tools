import MockAdapter from 'axios-mock-adapter';

import api from './../services/api';
import { store } from './index';
import {
  ASYNC_THUNK_TYPE_PREFIX,
  fetchRepositories,
  search,
  setToolReadme,
  toggleIsSearchEnabled,
} from './../features/ToolsList/toolsListSlice';
import searchRepositories from './__mocks__/searchRepositories';

let mockAdapter: MockAdapter;

const FETCH_REPOSITORIES_RESPONSE_TYPES = {
  fulfilled: `${ASYNC_THUNK_TYPE_PREFIX}/fulfilled`,
  rejected: `${ASYNC_THUNK_TYPE_PREFIX}/rejected`,
};

const url = `/search/repositories`;

const mockSuccessNetworkResponse = () => {
  mockAdapter.onGet(url).reply(200, searchRepositories);
};

const mockFailNetworkResponse = () => {
  mockAdapter.onGet(url).reply(400);
};

describe(`Store`, () => {
  beforeAll(() => {
    mockAdapter = new MockAdapter(api);

    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockSuccessNetworkResponse();
  });

  afterEach(() => {
    mockAdapter.reset();
  });

  it(`Should initially set tools as object with all and filtered properties as empty array and isLoading and isSearchEnabled as false`, () => {
    const { tools } = store.getState();

    expect(tools).toEqual({
      all: [],
      filtered: [],
      isLoading: false,
      isSearchEnabled: false,
    });
  });

  it(`Should be able to fetch the repositories`, async () => {
    const { tools: initialTools } = store.getState();
    expect(initialTools.revalidateIn).toBeUndefined();

    const result = await store.dispatch(fetchRepositories());
    expect(result.type).toBe(FETCH_REPOSITORIES_RESPONSE_TYPES.fulfilled);

    expect(result.payload).toEqual(searchRepositories);

    const { tools } = store.getState();

    expect(tools.all.length).toBeGreaterThan(0);
    expect(tools.revalidateIn).not.toBeUndefined();
  });

  it(`Should have error message when occur error on try to fetch repositories`, async () => {
    mockFailNetworkResponse();

    const result = await store.dispatch(fetchRepositories());
    expect(result.type).toBe(FETCH_REPOSITORIES_RESPONSE_TYPES.rejected);

    const { tools } = store.getState();

    expect(tools.errorMessage).not.toBeUndefined();
  });

  it(`Should search tools`, async () => {
    const { tools: toolsBeforeSearch } = store.getState();

    expect(toolsBeforeSearch.filtered.length).toBe(0);

    store.dispatch(search(`consulta`));

    const { tools } = store.getState();

    expect(tools.filtered.length).toBe(2);
  });

  it(`Should set readme to specific tool`, async () => {
    const readme = `# Title`;

    const { tools: toolsBeforeSetReadme } = store.getState();

    expect(toolsBeforeSetReadme.all[0].readme).toBeUndefined();

    store.dispatch(
      setToolReadme({ slug: searchRepositories.items[0].name, readme })
    );

    const { tools } = store.getState();

    expect(tools.all[0].readme).toBe(readme);
  });

  it(`Should enable search`, async () => {
    const { tools: initialTools } = store.getState();

    expect(initialTools.isSearchEnabled).toBeFalsy();

    store.dispatch(toggleIsSearchEnabled());

    const { tools } = store.getState();

    expect(tools.isSearchEnabled).toBeTruthy();
  });

  it(`Should disable search`, async () => {
    const { tools: initialTools } = store.getState();

    expect(initialTools.isSearchEnabled).toBeTruthy();

    store.dispatch(toggleIsSearchEnabled());

    const { tools } = store.getState();

    expect(tools.isSearchEnabled).toBeFalsy();
  });
});
