const api = "http://127.0.0.1:5000";

export interface movieData {
  title: string;
  year: number;
  kind: string;
  cover_url: string;
  imdb_id: string;
  rating: number;
}

export function getAvaiableLists() {
  const avaiableLists = fetch(`${api}/lists`, {
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
  const movieSearchResult = fetch(`${api}/get_movie/${imdbID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return movieSearchResult;
}

export function addMovieToList(movieEntry: movieData, listID: number) {
  const currentList = fetch(`${api}/add_movie/${listID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieEntry),
  });

  return currentList;
}

export function addList(name: string) {
  const avaiableLists = fetch(`${api}/add_list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ list_name: name }),
  });

  return avaiableLists;
}

export function saveList(listID: number, order: number[]) {
  const response = fetch(`${api}/save_list/${listID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order: order }),
  });

  return response;
}
