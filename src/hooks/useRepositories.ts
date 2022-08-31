import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from './../store';
import {
  ToolsProps,
  fetchRepositories,
} from './../features/ToolsList/toolsListSlice';

const useRepositories = () => {
  const { searchParam, all, filtered, errorMessage, isLoading, revalidateIn } =
    useSelector<RootState, ToolsProps>(({ tools }) => tools);
  const dispatch = useDispatch<AppDispatch>();

  const [refetchController, setRefetchController] = useState(0);

  const revalidate =
    !revalidateIn || new Date().valueOf() > new Date(revalidateIn).valueOf();

  const refetch = () => setRefetchController((refetched) => refetched + 1);

  useEffect(() => {
    if (revalidate || refetchController) {
      dispatch(fetchRepositories());
    }
  }, [revalidate, refetchController, dispatch]);

  return {
    data: searchParam ? filtered : all,
    errorMessage,
    isLoading,
    refetch,
  };
};

export default useRepositories;
