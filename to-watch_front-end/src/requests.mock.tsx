import { fn } from "@storybook/test";
import {
  SearchMultipleMoviesResult,
  SearchSingleMovieResult,
} from "./interfaces";

export const mockList1 = {
  onAddList: fn(),
  onSelectList: fn(),
  avaiableLists: [
    { id: 9090, name: "Lista 1" },
    { id: 123, name: "Lista 2" },
    { id: 124, name: "Lista 3" },
  ],
  currentList: {
    id: 9090,
    name: "Lista 1",
    entries: [
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
    ],
  },
};

export function searchMovieMock() {
  const myPromise = new Promise<SearchMultipleMoviesResult[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          imdbID: "2580046",
          title: "Miraculous: Tales of Ladybug & Cat Noir",
          year: "2015",
          kind: "tv series",
          "cover url":
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
          "full-size cover url":
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        },
        {
          imdbID: "3431758",
          title: "No Game, No Life",
          year: "2014",
          kind: "tv series",
          "cover url":
            "https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@.jpg",
          "full-size cover url":
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        },
        {
          imdbID: "2580046",
          title: "Miraculous: Tales of Ladybug & Cat Noir",
          year: "2015",
          kind: "tv series",
          "cover url":
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
          "full-size cover url":
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        },
        {
          imdbID: "3431758",
          title: "No Game, No Life",
          year: "2014",
          kind: "tv series",
          "cover url":
            "https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@.jpg",
          "full-size cover url":
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        },
      ]);
    }, 300);
  });
  return myPromise;
}

export function getMovieMock() {
  const myPromise = new Promise<SearchSingleMovieResult>((resolve) => {
    setTimeout(() => {
      resolve({
        imdbID: "",
        title: "Miraculous: Tales of Ladybug & Cat Noir",
        year: "2015",
        kind: "tv series",
        "cover url":
          "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        rating: "7.5",
        genres: "",
        plotOutline: "",
        "full-size cover url": "",
      });
    }, 300);
  });
  return myPromise;
}
