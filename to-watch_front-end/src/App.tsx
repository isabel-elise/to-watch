import { useEffect, useState } from "react";

import "./App.css";
import { MovieSearchSection } from "./sections/MovieSearchSection/MovieSearchSection";
import { MovieLineListSection } from "./sections/MovieLineListSection/MovieLineListSection";
import { MovieCardListSection } from "./sections/MovieCardListSection/MovieCardListSection";
import { SearchResult } from "./components/SearchBar/SearchBar";
import { MovieCardProps } from "./components/MovieCard/MovieCard";

const mockList = [
  {
    id: "2580046",
    title: "Miraculous: Tales of Ladybug & Cat Noir",
    year: 2015,
    kind: "tv series",
    coverUrl:
      "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
    imdbRating: 7.5,
    watched: false,
  },
  {
    id: " 3431758",
    title: "No Game, No Life",
    year: 2014,
    kind: "tv series",
    coverUrl:
      "https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@.jpg",
    imdbRating: 7.6,
    watched: false,
  },
];

function onSearchMovie(): Promise<SearchResult[]> {
  const myPromise = new Promise<SearchResult[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          imdbID: "2580046",
          title: "Miraculous: Tales of Ladybug & Cat Noir",
          year: "2015",
          kind: "tv series",
          coverUrl:
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        },
        {
          imdbID: " 3431758",
          title: "No Game, No Life",
          year: "2014",
          kind: "tv series",
          coverUrl:
            "https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@.jpg",
        },
      ]);
    }, 300);
  });
  return myPromise;
}

function onGetMovie(): Promise<MovieCardProps> {
  const myPromise = new Promise<MovieCardProps>((resolve) => {
    setTimeout(() => {
      resolve({
        id: "2580046",
        title: "Miraculous: Tales of Ladybug & Cat Noir",
        year: 2015,
        kind: "tv series",
        coverUrl:
          "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        imdbRating: 7.5,
        watched: false,
      });
    }, 300);
  });
  return myPromise;
}

function App() {
  const [currentMovieList, setCurrentMovieList] =
    useState<MovieCardProps[]>(mockList);

  useEffect(() => {}, []);
  return (
    <div className="main-screen">
      <MovieSearchSection
        onSearchMovie={onSearchMovie}
        onGetMovie={onGetMovie}
        onAddMovieToWatch={(card: MovieCardProps) =>
          alert("Adicionando " + card.title + "na lista")
        }
      />
      <MovieLineListSection movieList={currentMovieList} />
      <MovieCardListSection
        movieList={currentMovieList}
        onChangeListOrder={() => {
          setCurrentMovieList([].concat(mockList).reverse());
          alert("Mudou a ordem");
        }}
      />
    </div>
  );
}

export default App;
