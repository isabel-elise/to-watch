import { MovieCardProps } from "../../components/MovieCard/MovieCard";
import { MovieLine } from "../../components/MovieLine/MovieLine";

import "./movieLineListSection.css";

interface MovieLineListSectionProps {
  movieList: MovieCardProps[];
}

export function MovieLineListSection({ movieList }: MovieLineListSectionProps) {
  return (
    <section className="movie-line-list-section">
      {movieList.map((movie) => {
        return (
          <MovieLine
            name={movie.title}
            imdbRating={movie.imdbRating}
            key={movie.id}
          />
        );
      })}
    </section>
  );
}
