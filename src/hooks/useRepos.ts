import { useState, useEffect } from 'react';

import api from './../services/api';
import isAxiosError from './../utils/isAxiosError';

type UseReposProps = {
  params?: {};
  filtered?: boolean;
};

type ToolProps = {
  description: string | null;
  language: string;
  livePreviewUrl: string | null;
  repoUrl: string;
  starsCount: number;
  subtitle: string;
  title: string;
};

type ErrorMessageProps = {
  message: string;
};

type RepoProps = Pick<ToolProps, `description` | `language`> & {
  full_name: string;
  homepage: string | null;
  html_url: string;
  name: string;
  stargazers_count: number;
  topics: string[];
};

const TOOLS = `luancode-tools`;

const useRepos = ({ params = {}, filtered = true }: UseReposProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );
  const [data, setData] = useState<ToolProps[]>([]);
  const [refetchController, setRefetchController] = useState(0);
  const [hasRequested, setHasRequested] = useState(false);

  const refetch = () => setRefetchController((prev) => prev + 1);

  useEffect(() => {
    const fetch = async () => {
      try {
        setHasRequested(true);
        setIsLoading(true);

        const { data: fetchedData } = await api.get<RepoProps[]>(
          `/users/luan11/repos`,
          {
            params,
          }
        );

        setData(
          fetchedData
            .filter(({ topics }) => topics.includes(TOOLS) || !filtered)
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
            )
        );
      } catch (error) {
        if (isAxiosError<ErrorMessageProps>(error)) {
          setErrorMessage(error.response?.data.message || error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!hasRequested || refetchController) {
      fetch();
    }
  }, [params, filtered, hasRequested, refetchController]);

  return { isLoading, errorMessage, data, refetch };
};

export default useRepos;
