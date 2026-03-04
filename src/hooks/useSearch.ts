import { Dispatch, SetStateAction, useState } from 'react';
import useDebounceText from './useDebounceText';
import { DEBOUNCE_DELAY } from '_utils/constants';

interface UseSearchReturnType {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  debouncedSearchText: string;
}

const useSearch = (defaultValue?: string): UseSearchReturnType => {
  const [searchText, setSearchText] = useState(defaultValue ?? '');
  const debouncedSearchText = useDebounceText(searchText, DEBOUNCE_DELAY);
  return { searchText, setSearchText, debouncedSearchText };
};

export default useSearch;
