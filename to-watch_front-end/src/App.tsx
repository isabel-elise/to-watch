import { useEffect, useState } from "react";

import "./App.css";
import { MovieSearchSection } from "./sections/MovieSearchSection/MovieSearchSection";
import { MovieLineListSection } from "./sections/MovieLineListSection/MovieLineListSection";
import { MovieCardListSection } from "./sections/MovieCardListSection/MovieCardListSection";
import { ListData, MovieEntry } from "./interfaces";
import {
  addList,
  addMovieToList,
  getAvaiableLists,
  getListEntries,
  saveList,
  searchMultipleMovies,
  searchSingleMovie,
} from "./requests";
import { changeListOrder } from "./methods";

function isListData(object: object): object is ListData {
  return object && "id" in object && "name" in object;
}

function App() {
  const [avaiableLists, setAvaliableLists] = useState([]);
  const [currentList, setCurrentList] = useState<{
    id: number;
    name: string;
    entries: MovieEntry[];
  }>({
    id: 0,
    name: "",
    entries: [],
  });

  useEffect(() => {
    getAvaiableLists()
      .then((response) => response.json())
      .then((data) => setAvaliableLists(data));

    if (currentList.id === 0 && avaiableLists.length) {
      const firstList = avaiableLists[0];
      if (isListData(firstList)) {
        onSelectList(firstList.id, firstList.name);
      }
    }
  }, []);

  function onSelectList(id: number, name: string) {
    getListEntries(id)
      .then((response) => response.json())
      .then((data) => setCurrentList({ id: id, name: name, entries: data }));
  }

  function onSaveList(id: number, order: number[]) {
    saveList(id, order).then(
      (response) => response.ok && alert(`Lista ${currentList.name} salva!`)
    );
  }

  return (
    <div className="main-screen">
      <MovieSearchSection
        onSearchMovie={searchMultipleMovies}
        onGetMovie={searchSingleMovie}
        onAddMovie={(card: MovieEntry) =>
          addMovieToList(card, currentList.id)
            .then((response) => response.json())
            .then((data) =>
              setCurrentList({
                id: currentList.id,
                name: currentList.name,
                entries: data,
              })
            )
        }
        onAddList={(name: string) => {
          addList(name)
            .then((response) => response.json())
            .then((data) => {
              setAvaliableLists(data);
            });
        }}
      />
      <MovieLineListSection
        avaiableLists={avaiableLists}
        currentList={currentList}
        onSelectList={onSelectList}
        onSaveList={onSaveList}
      />
      <MovieCardListSection
        movieList={currentList ? currentList.entries : []}
        onChangeListOrder={(index, operation) => {
          const newList = changeListOrder(
            currentList.entries,
            index,
            operation
          );
          setCurrentList({ ...currentList, entries: newList });
        }}
      />
    </div>
  );
}

export default App;
