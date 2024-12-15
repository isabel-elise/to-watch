import { MovieEntry } from "./interfaces";

const api = "http://127.0.0.1:5000";

export interface movieData {
  title: string;
  year: number;
  kind: string;
  coverUrl: string;
  imdbID: string;
  rating: number;
}

export function getAvaiableLists() {
  const avaiableLists = fetch(`${api}/lists/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return avaiableLists;
}

export function getListEntries(listID: number) {
  const avaiableLists = fetch(`${api}/movies/${listID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return avaiableLists;
}

export function searchMultipleMovies(keyword: string) {
  const searchResults = fetch(`${api}/search_movie/${keyword}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return searchResults;
}

export function searchSingleMovie(imdbID: string) {
  const movieData = fetch(`${api}/get_movie/${imdbID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return movieData;
}

export function addMovieToList(movieEntry: movieData, listID: number) {
  const movieData = fetch(`${api}/add_movie/${listID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieEntry),
  });

  return movieData;
}

export function addList(name: string) {
  const movieData = fetch(`${api}/add_list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });

  return movieData;
}

export function saveList(entries: MovieEntry[], listID: number) {
  fetch(`${api}/save_list/${listID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entries),
  });
}
