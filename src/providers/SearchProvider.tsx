"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

type Params = Partial<{ [K in keyof SearchQuery]: SearchQuery[K] }>;

type SearchQuery = {
  dateRange: [Date | null, Date | null];
  people: number;
};

type SearchType = {
  query: SearchQuery;
  updateQuery: (params: Params) => void;
  resetQuery: () => void;
};

const SearchContext = createContext<SearchType>({
  query: {
    dateRange: [null, null],
    people: 1,
  },
  updateQuery: () => {},
  resetQuery: () => {},
});

const SearchProvider = ({ children }: PropsWithChildren) => {
  const [query, setQuery] = useState<SearchQuery>({
    dateRange: [null, null],
    people: 1,
  });

  const updateQuery = (params: Params) => {
    setQuery((prev) => ({ ...prev, ...params }));
  };

  const resetQuery = () => {
    setQuery({ dateRange: [null, null], people: 1 });
  };

  return (
    <SearchContext.Provider value={{ query, updateQuery, resetQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

export const useSearch = () => useContext(SearchContext);
