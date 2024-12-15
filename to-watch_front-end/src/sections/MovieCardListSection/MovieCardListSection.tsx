import { MovieCardList } from "../../components/MovieCardList/MovieCardList";
import { MovieEntry } from "../../interfaces";

import "./movieCardListSection.css";

interface MovieCardListSectionProps {
  movieList: MovieEntry[];
  onChangeListOrder: (index: number, operation: string) => void;
}

export function MovieCardListSection({
  movieList,
  onChangeListOrder,
}: MovieCardListSectionProps) {
  return (
    <section className="movie-card-list-section">
      {movieList && (
        <MovieCardList
          movieCardList={movieList}
          onChangeListOrder={onChangeListOrder}
        />
      )}
    </section>
  );
}
