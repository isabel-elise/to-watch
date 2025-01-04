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

interface MovieSearchSectionProps {
  onSearchMovie: (keyword: string) => Promise<Response>;
  onGetMovie: (imdbID: string) => Promise<Response>;
  onAddMovie: (movie: MovieEntry) => void;
  onAddList: (name: string) => void;
}

function isMovieEntry(object: object | undefined): object is MovieEntry {
  if (object && "imdb_id" in object && "id" in object) return true;
  return false;
}

function searchResultToEntry(searchResult: SearchSingleMovieResult) {
  return {
    id: 0,
    title: searchResult.title,
    year: Number(searchResult.year),
    kind: searchResult.kind,
    cover_url: searchResult["full-size cover url"],
    imdb_id: searchResult.imdbID,
    rating: Number(searchResult.rating),
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

  const [loadingResults, setLoadingResults] = useState(false);
  const [loadingMovieInfo, setLoadingMovieInfo] = useState(false);

  const [parent] = useAutoAnimate();

  useEffect(() => {
    if (selectedMovie !== "") {
      setLoadingMovieInfo(true);
      onGetMovie(selectedMovie)
        .then((response) => response.json())
        .then((data) => {
          setLoadingMovieInfo(false);
          setMovieCard(searchResultToEntry(data));
        });
    }
  }, [selectedMovie, onGetMovie]);

  return (
    <section className="movie-search-section">
      <SearchBar
        onSearchMovie={(keyword: string) => {
          setLoadingResults(true);
          onSearchMovie(keyword)
            .then((response) => response.json())
            .then((data) => {
              setLoadingResults(false);
              setSearchResults(data);
            });
        }}
      />
      <section className="search-results-container" ref={parent}>
        {loadingResults ? (
          <span className="loading-results-text">Buscando resultados...</span>
        ) : (
          searchResults.map((result) => (
            <div
              key={result.imdbID}
              className="search-result"
              onClick={() => setSelectedMovie(result.imdbID)}
            >
              <p>{result.title}</p>
              <p>{result.year}</p>
              <p>{result.kind}</p>
            </div>
          ))
        )}
      </section>
      <section className="selected-movie-container">
        {loadingMovieInfo ? (
          <span className="loading-movieinfo-text">
            Carregando informações da seleção...
          </span>
        ) : isMovieEntry(movieCard) ? (
          <MovieCard {...movieCard} />
        ) : (
          <></>
        )}
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
                onAddList(newListName);
                setListCreationActive(false);
                setNewListname("");
              }
            }}
          />
          <button
            id="add-list"
            onClick={() => {
              onAddList(newListName);
              setListCreationActive(false);
              setNewListname("");
            }}
          >
            <RiAddCircleLine color="#F8F5F2" size="1.8em" />
          </button>
        </section>
      )}
    </section>
  );
}
