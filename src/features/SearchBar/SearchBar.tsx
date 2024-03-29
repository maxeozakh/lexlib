import { useGlobalStore } from "../../state/store";
import { startTransition } from "react";

import "./SearchBar.css";

export const SearchBar = () => {
  const { setSearchRequest, searchRequest, filterDataByTopic } =
    useGlobalStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRequest(e.target.value);
    startTransition(() => {
      filterDataByTopic(e.target.value);
    });
  };

  return (
    <input
      className="searchBar"
      value={searchRequest}
      onChange={handleSearch}
      type="text"
      placeholder=" Search for a topic..."
    />
  );
};
