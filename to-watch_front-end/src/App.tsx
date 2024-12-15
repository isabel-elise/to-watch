import { useEffect, useState } from "react";

import "./App.css";
import { MovieSearchSection } from "./sections/MovieSearchSection/MovieSearchSection";
import { MovieLineListSection } from "./sections/MovieLineListSection/MovieLineListSection";
import { MovieCardListSection } from "./sections/MovieCardListSection/MovieCardListSection";
import { MovieEntry } from "./interfaces";

function App({ searchMovie, getMovie, changeListOrder, mockList1 }) {
  const [currentMovieList, setCurrentMovieList] = useState<MovieEntry[]>([]);

  useEffect(() => {
    setCurrentMovieList(mockList1);
  }, [mockList1]);
  return (
    <div className="main-screen">
      <MovieSearchSection
        onSearchMovie={searchMovie}
        onGetMovie={getMovie}
        onAddMovieToWatch={(card: MovieEntry) =>
          alert("Adicionando " + card.title + " na lista")
        }
      />
      <MovieLineListSection movieList={currentMovieList} />
      <MovieCardListSection
        movieList={currentMovieList}
        onChangeListOrder={(index, operation) => {
          const newList = changeListOrder(currentMovieList, index, operation);
          setCurrentMovieList(newList);
        }}
      />
    </div>
  );
}

export default App;
