import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from './../../services/api';

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

type ToolsProps = {
  all: ToolProps[];
  filtered: ToolProps[];
  isLoading: boolean;
  errorMessage: string | undefined;
};

export const fetchRepositories = createAsyncThunk(`tools/fetch`, async () => {
  const { data } = await api.get<RepositoryProps[]>(`/users/luan11/repos`, {
    params: {
      sort: `created`,
      visibility: `public`,
    },
  });

  return data;
});

const initialState: ToolsProps = {
  all: [],
  filtered: [],
  isLoading: false,
  errorMessage: undefined,
};

const tools = createSlice({
  name: `tools`,
  initialState,
  reducers: {},
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
      })
      .addCase(fetchRepositories.rejected, (state, { payload }) => {
        console.log(payload);
      });
  },
});

export default tools.reducer;
