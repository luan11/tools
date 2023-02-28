import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import api from './../../services/api';
import escapeRegExp from './../../utils/escapeRegExp';

export const ASYNC_THUNK_TYPE_PREFIX = `tools/fetchRepositories`;

const QUERY = `luancode-tools`;
const SORT = `name`;
const ORDER = `asc`;

const REPOSITORIES_TO_HIDE = [`tools`];

type ToolProps = {
  description: string | null;
  language: string;
  livePreviewUrl: string | null;
  readme?: string;
  repoUrl: string;
  starsCount: number;
  subtitle: string;
  title: string;
};

type RepositoryProps = Pick<ToolProps, `description` | `language`> & {
  full_name: string;
  homepage: string | null;
  html_url: string;
  name: string;
  stargazers_count: number;
  topics: string[];
};

type Repositories = {
  total_count: string;
  incomplete_results: boolean;
  items: RepositoryProps[];
};

export type ToolsProps = {
  all: ToolProps[];
  errorMessage?: string;
  filtered: ToolProps[];
  isLoading: boolean;
  isSearchEnabled: boolean;
  revalidateIn?: string;
  searchParam?: string;
};

export const fetchRepositories = createAsyncThunk(
  ASYNC_THUNK_TYPE_PREFIX,
  async () => {
    const { data } = await api.get<Repositories>(`/search/repositories`, {
      params: {
        q: QUERY,
        sort: SORT,
        order: ORDER,
      },
    });

    return data;
  }
);

const initialState: ToolsProps = {
  all: [],
  filtered: [],
  isLoading: false,
  isSearchEnabled: false,
};

const tools = createSlice({
  name: `tools`,
  initialState,
  reducers: {
    search: (state, { payload }: PayloadAction<string>) => {
      state.searchParam = payload;

      const searchParamRegExp = new RegExp(escapeRegExp(payload), `i`);

      state.filtered = state.all.filter(
        ({ title, subtitle }) =>
          searchParamRegExp.test(title) || searchParamRegExp.test(subtitle)
      );
    },
    setToolReadme: (
      state,
      {
        payload: { slug, readme },
      }: PayloadAction<{ slug: string; readme: string }>
    ) => {
      state.all = state.all.map((tool) =>
        tool.title === slug ? { ...tool, readme } : tool
      );
    },
    toggleIsSearchEnabled: (state) => {
      state.isSearchEnabled = !state.isSearchEnabled;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRepositories.fulfilled, (state, { payload: { items } }) => {
        const parsedPayload = items
          .filter(({ name }) => !REPOSITORIES_TO_HIDE.includes(name))
          .map(
            ({
              description,
              full_name,
              homepage,
              html_url,
              language,
              name,
              stargazers_count,
            }) => ({
              description,
              language,
              livePreviewUrl: homepage,
              repoUrl: html_url,
              starsCount: stargazers_count,
              subtitle: full_name,
              title: name,
            })
          );

        state.all = parsedPayload;
        state.isLoading = false;

        const now = new Date();
        now.setDate(now.getDate() + 7);

        state.revalidateIn = now.toUTCString();
      })
      .addCase(fetchRepositories.rejected, (state) => {
        state.errorMessage = `An error occurred while fetching tools`;
        state.isLoading = false;
      });
  },
});

export const { search, setToolReadme, toggleIsSearchEnabled } = tools.actions;

export default tools.reducer;
