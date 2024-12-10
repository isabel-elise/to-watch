import { MovieCardProps } from "../../components/MovieCard/MovieCard";
import { MovieCardList } from "../../components/MovieCardList/MovieCardList";

import "./movieCardListSection.css";

interface MovieCardListSectionProps {
  movieList: MovieCardProps[];
  onChangeListOrder: (movieId: string, operation: string) => void;
}

export function MovieCardListSection({
  movieList,
  onChangeListOrder,
}: MovieCardListSectionProps) {
  return (
    <section className="movie-card-list-section">
      <MovieCardList
        movieCardList={movieList}
        onChangeListOrder={onChangeListOrder}
      />
    </section>
  );
}
