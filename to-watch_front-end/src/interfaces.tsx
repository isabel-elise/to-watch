export interface SearchMultipleMoviesResult {
  imdbID: string;
  title: string;
  year: string;
  kind: string;
  "cover url": string;
  "full-size cover url": string;
}

export interface SearchSingleMovieResult extends SearchMultipleMoviesResult {
  rating: string;
  genres: string;
  plotOutline: string;
}

export interface MovieEntry {
  id: number;
  title: string;
  year: number;
  kind: string;
  cover_url: string;
  imdb_id: string;
  rating: number;
}

export interface MovieList {
  id: number;
  name: string;
  entries: MovieEntry[];
}

export interface ListData {
  id: number;
  name: string;
}
