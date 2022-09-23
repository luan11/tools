import { useState, useMemo, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

import { AppDispatch } from './../../store';
import useSelectTools from './../../hooks/useSelectTools';
import { search } from './../../features/ToolsList/toolsListSlice';

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isSearchEnabled } = useSelectTools();

  const searchIconColor = useColorModeValue(`mediumTurquoise`, ``);

  const [searchParam, setSearchParam] = useState(``);

  const handleDebounce = useMemo(
    () => debounce((value: string) => dispatch(search(value)), 500),
    [dispatch]
  );

  const handleSearch = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(value);
    handleDebounce(value);
  };

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<FiSearch color={searchIconColor} />}
      />
      <Input
        type="search"
        placeholder="Search the tools"
        value={searchParam}
        onChange={handleSearch}
        disabled={!isSearchEnabled}
      />
    </InputGroup>
  );
};

export default Search;
