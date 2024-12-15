import { useEffect, useState } from "react";

import "./App.css";
import { MovieSearchSection } from "./sections/MovieSearchSection/MovieSearchSection";
import {
  MovieLineListSection,
  MovieLineListSectionProps,
} from "./sections/MovieLineListSection/MovieLineListSection";
import { MovieCardListSection } from "./sections/MovieCardListSection/MovieCardListSection";
import { MovieEntry } from "./interfaces";
import { fn } from "@storybook/test";

function App({ searchMovie, getMovie, changeListOrder, mockList1 }) {
  const [currentMovieList, setCurrentMovieList] =
    useState<MovieLineListSectionProps>();

  useEffect(() => {
    setCurrentMovieList(mockList1);
  }, [mockList1]);
  return (
    <div className="main-screen">
      <MovieSearchSection
        onSearchMovie={searchMovie}
        onGetMovie={getMovie}
        onAddMovie={(card: MovieEntry) =>
          alert("Adicionando " + card.title + " na lista")
        }
        onAddList={fn}
      />

      {currentMovieList && <MovieLineListSection {...currentMovieList} />}
      {currentMovieList && (
        <MovieCardListSection
          movieList={currentMovieList?.currentList.entries}
          onChangeListOrder={(index, operation) => {
            const newList = changeListOrder(
              currentMovieList.currentList.entries,
              index,
              operation
            );
            setCurrentMovieList({
              ...currentMovieList,
              currentList: {
                ...currentMovieList.currentList,
                entries: newList,
              },
            });
          }}
        />
      )}
    </div>
  );
}

export default App;
