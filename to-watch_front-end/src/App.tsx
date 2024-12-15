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
import { searchMultipleMovies } from "./requests";

function App({ getMovie, changeListOrder, mockList1 }) {
  const [currentMovieList, setCurrentMovieList] =
    useState<MovieLineListSectionProps>({
      currentList: { id: 0, name: "", entries: [] },
      avaiableLists: [],
      onSelectList: fn(),
      onSaveList: fn(),
    });

  useEffect(() => {
    setCurrentMovieList(mockList1);
  }, [mockList1]);
  return (
    <div className="main-screen">
      <MovieSearchSection
        onSearchMovie={searchMultipleMovies}
        onGetMovie={getMovie}
        onAddMovie={(card: MovieEntry) =>
          alert("Adicionando " + card.title + " na lista")
        }
        onAddList={fn}
      />
      <MovieLineListSection {...currentMovieList} />
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
      )
    </div>
  );
}

export default App;
