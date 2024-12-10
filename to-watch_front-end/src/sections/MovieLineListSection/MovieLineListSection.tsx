import { MovieCardProps } from "../../components/MovieCard/MovieCard";
import { MovieLine } from "../../components/MovieLine/MovieLine";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import "./movieLineListSection.css";

interface MovieLineListSectionProps {
  movieList: MovieCardProps[];
}

export function MovieLineListSection({ movieList }: MovieLineListSectionProps) {
  const [parent] = useAutoAnimate();
  return (
    <section className="movie-line-list-section" ref={parent}>
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
