import { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import "./movieSearchSection.css";
import { RiAddCircleLine, RiAddLine } from "react-icons/ri";
import {
  MovieEntry,
  SearchMultipleMoviesResult,
  SearchSingleMovieResult,
} from "../../interfaces";
import { searchMultipleMovies } from "../../requests";

interface MovieSearchSectionProps {
  onSearchMovie: (keyword: string) => Promise<Response>;
  onGetMovie: (imdbID: string) => Promise<SearchSingleMovieResult>;
  onAddMovie: (movie: MovieEntry) => void;
  onAddList: (name: string) => void;
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
  onAddMovie,
  onAddList,
}: MovieSearchSectionProps) {
  const [searchResults, setSearchResults] = useState<
    SearchMultipleMoviesResult[]
  >([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [movieCard, setMovieCard] = useState<MovieEntry>();
  const [listCreationActive, setListCreationActive] = useState(false);
  const [newListName, setNewListname] = useState("");

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
          onSearchMovie(keyword)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setSearchResults(data);
            })
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

      {!listCreationActive ? (
        <section className="add-buttons">
          <button id="create-list" onClick={() => setListCreationActive(true)}>
            Criar nova lista <RiAddCircleLine color="#F8F5F2" size="1.8em" />
          </button>
          <button
            id="add-movie"
            onClick={() => isMovieEntry(movieCard) && onAddMovie(movieCard)}
          >
            Adicionar entrada <RiAddLine color="#F8F5F2" size="1.8em" />
          </button>
        </section>
      ) : (
        <section className="add-buttons">
          <input
            id="list-name-input"
            type="text"
            placeholder="Insira um nome para a nova lista"
            value={newListName}
            onChange={(e) => setNewListname(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
          <button
            id="add-list"
            onClick={() => {
              alert("Adicionando nova lista: " + newListName);
              onAddList(newListName);
            }}
          >
            <RiAddCircleLine color="#F8F5F2" size="1.8em" />
          </button>
        </section>
      )}
    </section>
  );
}
