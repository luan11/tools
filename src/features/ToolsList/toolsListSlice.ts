import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import api from './../../services/api';
import escapeRegExp from './../../utils/escapeRegExp';

const ALLOWED_TOPIC = `luancode-tools`;

type ToolProps = {
  description: string | null;
  language: string;
  livePreviewUrl: string | null;
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

export type ToolsProps = {
  all: ToolProps[];
  filtered: ToolProps[];
  isLoading: boolean;
  errorMessage?: string;
  revalidateIn?: string;
  searchParam?: string;
};

export const fetchRepositories = createAsyncThunk(
  `tools/fetchRepositories`,
  async () => {
    const { data } = await api.get<RepositoryProps[]>(`/users/luan11/repos`, {
      params: {
        sort: `created`,
        visibility: `public`,
      },
    });

    return data;
  }
);

const initialState: ToolsProps = {
  all: [],
  filtered: [],
  isLoading: false,
};

const tools = createSlice({
  name: `tools`,
  initialState,
  reducers: {
    search: (state, { payload }: PayloadAction<string>) => {
      state.searchParam = payload;

      const searchParamRegExp = new RegExp(escapeRegExp(payload));

      state.filtered = state.all.filter(
        ({ title, subtitle }) =>
          searchParamRegExp.test(title) || searchParamRegExp.test(subtitle)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRepositories.fulfilled, (state, { payload }) => {
        const parsedPayload = payload
          .filter(({ topics }) => topics.includes(ALLOWED_TOPIC))
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

export const { search } = tools.actions;

export default tools.reducer;
