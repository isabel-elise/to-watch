import { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import "./movieSearchSection.css";
import { RiAddLine } from "react-icons/ri";
import {
  MovieEntry,
  SearchMultipleMoviesResult,
  SearchSingleMovieResult,
} from "../../interfaces";

interface MovieSearchSectionProps {
  onSearchMovie: (keyword: string) => Promise<SearchMultipleMoviesResult[]>;
  onGetMovie: (imdbID: string) => Promise<SearchSingleMovieResult>;
  onAddMovieToWatch: (movie: MovieEntry) => void;
}

function isMovieEntry(object: object | undefined): object is MovieEntry {
  if (object && "imdbID" in object && "id" in object) return true;
  return false;
}

function isValidSearchResult(
  object: object | undefined
): object is SearchSingleMovieResult {
  if (object && "imdbID" in object) return true;
  return false;
}

function searchResultToEntry(searchResult: SearchSingleMovieResult) {
  return {
    id: 0,
    title: searchResult.title,
    year: Number(searchResult.year),
    kind: searchResult.kind,
    coverUrl: searchResult.coverUrl,
    imdbID: searchResult.imdbID,
    rating: Number(searchResult.imdbID),
  };
}

export function MovieSearchSection({
  onSearchMovie,
  onGetMovie,
  onAddMovieToWatch,
}: MovieSearchSectionProps) {
  const [searchResults, setSearchResults] = useState<
    SearchMultipleMoviesResult[]
  >([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [movieCard, setMovieCard] = useState<MovieEntry>();

  const [parent] = useAutoAnimate();

  useEffect(() => {
    if (selectedMovie !== "") {
      onGetMovie(selectedMovie).then(
        (result) =>
          isValidSearchResult(result) &&
          setMovieCard(searchResultToEntry(result))
      );
    }
  }, [selectedMovie, onGetMovie]);

  return (
    <section className="movie-search-section">
      <SearchBar
        onSearchMovie={(keyword: string) =>
          onSearchMovie(keyword).then(
            (results) => results && results.length && setSearchResults(results)
          )
        }
      />
      <section className="search-results-container" ref={parent}>
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
        {isMovieEntry(movieCard) ? <MovieCard {...movieCard} /> : <></>}
      </section>
      <section className="add-movie-buttons">
        <button
          onClick={() =>
            isMovieEntry(movieCard) && onAddMovieToWatch(movieCard)
          }
        >
          Adicionar <RiAddLine color="#F8F5F2" size="1.8em" />
        </button>
      </section>
    </section>
  );
}
