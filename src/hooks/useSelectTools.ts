import { useSelector } from 'react-redux';

import { RootState } from './../store';
import { ToolsProps } from './../features/ToolsList/toolsListSlice';

const useSelectTools = () => {
  const tools = useSelector<RootState, ToolsProps>(({ tools }) => tools);

  return tools;
};

export default useSelectTools;
