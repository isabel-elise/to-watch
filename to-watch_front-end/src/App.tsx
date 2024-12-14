import { useEffect, useState } from "react";

import "./App.css";
import { MovieSearchSection } from "./sections/MovieSearchSection/MovieSearchSection";
import { MovieLineListSection } from "./sections/MovieLineListSection/MovieLineListSection";
import { MovieCardListSection } from "./sections/MovieCardListSection/MovieCardListSection";
import {
  MovieEntry,
  SearchMultipleMoviesResult,
  SearchSingleMovieResult,
} from "./interfaces";

const mockList: MovieEntry[] = [
  {
    id: 2580046,
    imdbID: "",
    title: "Miraculous: Tales of Ladybug & Cat Noir",
    year: 2015,
    kind: "tv series",
    coverUrl:
      "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
    rating: 7.5,
  },
  {
    id: 3431758,
    imdbID: "",
    title: "No Game, No Life",
    year: 2014,
    kind: "tv series",
    coverUrl:
      "https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@.jpg",
    rating: 7.6,
  },
  {
    id: 30217403,
    imdbID: "30217403",
    title: "Dan Da Dan",
    year: 2024,
    kind: "tv series",
    coverUrl:
      "https://m.media-amazon.com/images/M/MV5BYWFhOWMxNTYtZThiMi00ZmQ5LTlmODktN2QwNzUyZjMyZGQzXkEyXkFqcGc@.jpg",
    rating: 8.7,
  },
];

function onSearchMovie(): Promise<SearchMultipleMoviesResult[]> {
  const myPromise = new Promise<SearchMultipleMoviesResult[]>((resolve) => {
    fetch("https://httpbin.org/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          imdbID: "2580046",
          title: "Miraculous: Tales of Ladybug & Cat Noir",
          year: "2015",
          kind: "tv series",
          coverUrl:
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
          fullSizeCoverUrl:
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        },
        {
          imdbID: "3431758",
          title: "No Game, No Life",
          year: "2014",
          kind: "tv series",
          coverUrl:
            "https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@.jpg",
          fullSizeCoverUrl:
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        },
      ]),
    }).then((response) => alert(JSON.stringify(response.bodyUsed)));
    setTimeout(() => {
      resolve([
        {
          imdbID: "2580046",
          title: "Miraculous: Tales of Ladybug & Cat Noir",
          year: "2015",
          kind: "tv series",
          coverUrl:
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
          fullSizeCoverUrl:
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        },
        {
          imdbID: "3431758",
          title: "No Game, No Life",
          year: "2014",
          kind: "tv series",
          coverUrl:
            "https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@.jpg",
          fullSizeCoverUrl:
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        },
      ]);
    }, 300);
  });
  return myPromise;
}

function onGetMovie(): Promise<SearchSingleMovieResult> {
  const myPromise = new Promise<SearchSingleMovieResult>((resolve) => {
    setTimeout(() => {
      resolve({
        imdbID: "",
        title: "Miraculous: Tales of Ladybug & Cat Noir",
        year: "2015",
        kind: "tv series",
        coverUrl:
          "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        rating: "7.5",
        genres: "",
        plotOutline: "",
        fullSizeCoverUrl: "",
      });
    }, 300);
  });
  return myPromise;
}

function changeListOrder(
  list: MovieEntry[],
  index: number,
  operation: string
): MovieEntry[] {
  let newList = [...list];

  if (operation === "up") {
    const aux = list[index - 1];
    newList[index - 1] = list[index];
    newList[index] = aux;
  } else if (operation === "down") {
    const aux = list[index + 1];
    newList[index + 1] = list[index];
    newList[index] = aux;
  } else if (operation === "first") {
    newList = [list[index]].concat(
      list.filter((_, listIndex) => listIndex !== index)
    );
  } else if (operation === "last") {
    newList = list
      .filter((_, listIndex) => listIndex !== index)
      .concat(list[index]);
  }

  return newList;
}

function App() {
  const [currentMovieList, setCurrentMovieList] =
    useState<MovieEntry[]>(mockList);

  useEffect(() => {}, []);
  return (
    <div className="main-screen">
      <MovieSearchSection
        onSearchMovie={onSearchMovie}
        onGetMovie={onGetMovie}
        onAddMovieToWatch={(card: MovieEntry) =>
          alert("Adicionando " + card.title + "na lista")
        }
      />
      <MovieLineListSection movieList={currentMovieList} />
      <MovieCardListSection
        movieList={currentMovieList}
        onChangeListOrder={(index, operation) => {
          const newList = changeListOrder(currentMovieList, index, operation);
          setCurrentMovieList(newList);
        }}
      />
    </div>
  );
}

export default App;
