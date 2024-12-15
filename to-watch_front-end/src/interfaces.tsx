export interface SearchMultipleMoviesResult {
  imdbID: string;
  title: string;
  year: string;
  kind: string;
  coverUrl: string;
  fullSizeCoverUrl: string;
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
  coverUrl: string;
  imdbID: string;
  rating: number;
}

export interface MovieList {
  id: number;
  name: string;
  entries: MovieEntry[];
}
