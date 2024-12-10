import { useEffect, useState } from "react";
import { SearchBar, SearchResult } from "../../components/SearchBar/SearchBar";
import {
  MovieCard,
  MovieCardProps,
} from "../../components/MovieCard/MovieCard";

import "./movieSearchSection.css";

interface MovieSearchSectionProps {
  onSearchMovie: (keyword: string) => Promise<SearchResult[]>;
  onGetMovie: (imdbID: string) => Promise<MovieCardProps>;
  onAddMovieToWatch: (movie: MovieCardProps) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isMovieCard(object: any): object is MovieCardProps {
  return !object ? false : "imdbRating" in object;
}

export function MovieSearchSection({
  onSearchMovie,
  onGetMovie,
  onAddMovieToWatch,
}: MovieSearchSectionProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [movieCard, setMovieCard] = useState<MovieCardProps>();

  useEffect(() => {
    if (selectedMovie !== "") {
      onGetMovie(selectedMovie).then((result) => setMovieCard(result));
    }
  }, [selectedMovie, onGetMovie]);

  return (
    <section>
      <SearchBar
        onSearchMovie={(keyword: string) =>
          onSearchMovie(keyword).then(
            (results) => results && results.length && setSearchResults(results)
          )
        }
      />
      <section className="search-results-container">
        {searchResults.map((result) => (
          <div
            key={result.imdbID}
            className="search-result"
            onMouseEnter={() => setSelectedMovie(result.imdbID)}
          >
            <p>{result.title}</p>
            <p>{result.year}</p>
            <p>{result.kind}</p>
          </div>
        ))}
      </section>
      <section className="selected-movie-container">
        {isMovieCard(movieCard) ? <MovieCard {...movieCard} /> : <></>}
      </section>
      <section className="add-movie-buttons">
        <button
          title="Adicionar entrada"
          onClick={() => isMovieCard(movieCard) && onAddMovieToWatch(movieCard)}
        />
      </section>
    </section>
  );
}
