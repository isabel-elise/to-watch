import { RiSearchLine } from "react-icons/ri";

import "./searchBar.css";
import { useState } from "react";

export interface SearchResult {
  imdbID: string;
  title: string;
  year: string;
  kind: string;
  coverUrl: string;
}

export function SearchBar({
  onSearchMovie,
}: {
  onSearchMovie: (searchText: string) => void;
}) {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="search-bar-container">
      <input
        id="search-input"
        type="text"
        placeholder="Buscar filme / série..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSearchMovie(searchText);
          }
        }}
      />
      <RiSearchLine />
    </div>
  );
}
