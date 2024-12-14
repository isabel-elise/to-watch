import { MovieLine } from "../../components/MovieLine/MovieLine";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MovieEntry } from "../../interfaces";

import "./movieLineListSection.css";

interface MovieLineListSectionProps {
  movieList: MovieEntry[];
}

export function MovieLineListSection({ movieList }: MovieLineListSectionProps) {
  const [parent] = useAutoAnimate();
  return (
    <section className="movie-line-list-section" ref={parent}>
      {movieList.map((movie) => {
        return (
          <MovieLine
            name={movie.title}
            imdbRating={movie.rating}
            key={movie.id}
          />
        );
      })}
    </section>
  );
}
