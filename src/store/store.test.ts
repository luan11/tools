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

let mockAdapter: MockAdapter;

const FETCH_REPOSITORIES_RESPONSE_TYPES = {
  fulfilled: `${ASYNC_THUNK_TYPE_PREFIX}/fulfilled`,
  rejected: `${ASYNC_THUNK_TYPE_PREFIX}/rejected`,
};

const url = `/users/luan11/repos`;

const fetchRepositoriesResponse = [
  {
    id: 433627721,
    node_id: 'R_kgDOGdiiSQ',
    name: 'consulta-tabela-fipe',
    full_name: 'luan11/consulta-tabela-fipe',
    private: false,
    owner: {
      login: 'luan11',
      id: 36796413,
      node_id: 'MDQ6VXNlcjM2Nzk2NDEz',
      avatar_url: 'https://avatars.githubusercontent.com/u/36796413?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/luan11',
      html_url: 'https://github.com/luan11',
      followers_url: 'https://api.github.com/users/luan11/followers',
      following_url:
        'https://api.github.com/users/luan11/following{/other_user}',
      gists_url: 'https://api.github.com/users/luan11/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/luan11/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/luan11/subscriptions',
      organizations_url: 'https://api.github.com/users/luan11/orgs',
      repos_url: 'https://api.github.com/users/luan11/repos',
      events_url: 'https://api.github.com/users/luan11/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/luan11/received_events',
      type: 'User',
      site_admin: false,
    },
    html_url: 'https://github.com/luan11/consulta-tabela-fipe',
    description: 'Project developed for a test propose.',
    fork: false,
    url: 'https://api.github.com/repos/luan11/consulta-tabela-fipe',
    forks_url: 'https://api.github.com/repos/luan11/consulta-tabela-fipe/forks',
    keys_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/keys{/key_id}',
    collaborators_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/collaborators{/collaborator}',
    teams_url: 'https://api.github.com/repos/luan11/consulta-tabela-fipe/teams',
    hooks_url: 'https://api.github.com/repos/luan11/consulta-tabela-fipe/hooks',
    issue_events_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/issues/events{/number}',
    events_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/events',
    assignees_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/assignees{/user}',
    branches_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/branches{/branch}',
    tags_url: 'https://api.github.com/repos/luan11/consulta-tabela-fipe/tags',
    blobs_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/git/blobs{/sha}',
    git_tags_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/git/tags{/sha}',
    git_refs_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/git/refs{/sha}',
    trees_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/git/trees{/sha}',
    statuses_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/statuses/{sha}',
    languages_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/languages',
    stargazers_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/stargazers',
    contributors_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/contributors',
    subscribers_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/subscribers',
    subscription_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/subscription',
    commits_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/commits{/sha}',
    git_commits_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/git/commits{/sha}',
    comments_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/comments{/number}',
    issue_comment_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/issues/comments{/number}',
    contents_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/contents/{+path}',
    compare_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/compare/{base}...{head}',
    merges_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/merges',
    archive_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/{archive_format}{/ref}',
    downloads_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/downloads',
    issues_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/issues{/number}',
    pulls_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/pulls{/number}',
    milestones_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/milestones{/number}',
    notifications_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/notifications{?since,all,participating}',
    labels_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/labels{/name}',
    releases_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/releases{/id}',
    deployments_url:
      'https://api.github.com/repos/luan11/consulta-tabela-fipe/deployments',
    created_at: '2021-12-01T00:12:18Z',
    updated_at: '2022-04-10T14:30:28Z',
    pushed_at: '2021-12-02T23:08:20Z',
    git_url: 'git://github.com/luan11/consulta-tabela-fipe.git',
    ssh_url: 'git@github.com:luan11/consulta-tabela-fipe.git',
    clone_url: 'https://github.com/luan11/consulta-tabela-fipe.git',
    svn_url: 'https://github.com/luan11/consulta-tabela-fipe',
    homepage: 'https://fipe.luancode.dev.br/',
    size: 96,
    stargazers_count: 0,
    watchers_count: 2,
    language: 'TypeScript',
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: null,
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [
      'context-api',
      'hooks',
      'luancode-tools',
      'mui',
      'nextjs',
      'react',
      'reactjs',
      'styled-components',
      'typescript',
    ],
    visibility: 'public',
    forks: 0,
    open_issues: 0,
    watchers: 2,
    default_branch: 'main',
  },
  {
    id: 380030319,
    node_id: 'MDEwOlJlcG9zaXRvcnkzODAwMzAzMTk=',
    name: 'consulta-cnpj',
    full_name: 'luan11/consulta-cnpj',
    private: false,
    owner: {
      login: 'luan11',
      id: 36796413,
      node_id: 'MDQ6VXNlcjM2Nzk2NDEz',
      avatar_url: 'https://avatars.githubusercontent.com/u/36796413?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/luan11',
      html_url: 'https://github.com/luan11',
      followers_url: 'https://api.github.com/users/luan11/followers',
      following_url:
        'https://api.github.com/users/luan11/following{/other_user}',
      gists_url: 'https://api.github.com/users/luan11/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/luan11/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/luan11/subscriptions',
      organizations_url: 'https://api.github.com/users/luan11/orgs',
      repos_url: 'https://api.github.com/users/luan11/repos',
      events_url: 'https://api.github.com/users/luan11/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/luan11/received_events',
      type: 'User',
      site_admin: false,
    },
    html_url: 'https://github.com/luan11/consulta-cnpj',
    description:
      'Application built with Next.js to get data from companies by CNPJ.',
    fork: false,
    url: 'https://api.github.com/repos/luan11/consulta-cnpj',
    forks_url: 'https://api.github.com/repos/luan11/consulta-cnpj/forks',
    keys_url: 'https://api.github.com/repos/luan11/consulta-cnpj/keys{/key_id}',
    collaborators_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/collaborators{/collaborator}',
    teams_url: 'https://api.github.com/repos/luan11/consulta-cnpj/teams',
    hooks_url: 'https://api.github.com/repos/luan11/consulta-cnpj/hooks',
    issue_events_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/issues/events{/number}',
    events_url: 'https://api.github.com/repos/luan11/consulta-cnpj/events',
    assignees_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/assignees{/user}',
    branches_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/branches{/branch}',
    tags_url: 'https://api.github.com/repos/luan11/consulta-cnpj/tags',
    blobs_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/git/blobs{/sha}',
    git_tags_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/git/tags{/sha}',
    git_refs_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/git/refs{/sha}',
    trees_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/git/trees{/sha}',
    statuses_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/statuses/{sha}',
    languages_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/languages',
    stargazers_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/stargazers',
    contributors_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/contributors',
    subscribers_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/subscribers',
    subscription_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/subscription',
    commits_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/commits{/sha}',
    git_commits_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/git/commits{/sha}',
    comments_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/comments{/number}',
    issue_comment_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/issues/comments{/number}',
    contents_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/contents/{+path}',
    compare_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/compare/{base}...{head}',
    merges_url: 'https://api.github.com/repos/luan11/consulta-cnpj/merges',
    archive_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/{archive_format}{/ref}',
    downloads_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/downloads',
    issues_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/issues{/number}',
    pulls_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/pulls{/number}',
    milestones_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/milestones{/number}',
    notifications_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/notifications{?since,all,participating}',
    labels_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/labels{/name}',
    releases_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/releases{/id}',
    deployments_url:
      'https://api.github.com/repos/luan11/consulta-cnpj/deployments',
    created_at: '2021-06-24T19:26:24Z',
    updated_at: '2022-04-10T14:34:20Z',
    pushed_at: '2021-06-24T19:31:27Z',
    git_url: 'git://github.com/luan11/consulta-cnpj.git',
    ssh_url: 'git@github.com:luan11/consulta-cnpj.git',
    clone_url: 'https://github.com/luan11/consulta-cnpj.git',
    svn_url: 'https://github.com/luan11/consulta-cnpj',
    homepage: 'https://consulta-cnpj.luancode.dev.br/',
    size: 93,
    stargazers_count: 1,
    watchers_count: 1,
    language: 'TypeScript',
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 1,
    license: null,
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [
      'api',
      'axios',
      'brazil',
      'brazilian-portuguese',
      'cnpj',
      'company',
      'localstorage',
      'luancode-tools',
      'material-ui',
      'nextjs',
      'react',
      'reactjs',
      'search',
      'ssr',
      'styled-components',
      'typescript',
    ],
    visibility: 'public',
    forks: 0,
    open_issues: 1,
    watchers: 1,
    default_branch: 'main',
  },
];

const mockSuccessNetworkResponse = () => {
  mockAdapter.onGet(url).reply(200, fetchRepositoriesResponse);
};

const mockFailNetworkResponse = () => {
  mockAdapter.onGet(url).reply(400);
};

describe(`Tools redux state tests`, () => {
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

    expect(result.payload).toEqual(fetchRepositoriesResponse);

    const { tools } = store.getState();

    expect(tools.all.length).toBe(fetchRepositoriesResponse.length);
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
      setToolReadme({ slug: fetchRepositoriesResponse[0].name, readme })
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
