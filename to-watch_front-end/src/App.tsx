import { useEffect, useState } from "react";

import "./App.css";
import { MovieSearchSection } from "./sections/MovieSearchSection/MovieSearchSection";
import { MovieLineListSection } from "./sections/MovieLineListSection/MovieLineListSection";
import { MovieCardListSection } from "./sections/MovieCardListSection/MovieCardListSection";
import { MovieEntry } from "./interfaces";
import {
  addList,
  addMovieToList,
  getAvaiableLists,
  getListEntries,
  removeList,
  removeMovieFromList,
  saveList,
  searchMultipleMovies,
  searchSingleMovie,
} from "./requests";
import { changeListOrder } from "./methods";

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
        onRemoveList={(id: number) => {
          removeList(id)
            .then((response) => response.json())
            .then((data) => data && setAvaliableLists(data));
        }}
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
        onRemoveEntry={(id: number) =>
          removeMovieFromList(id, currentList.id)
            .then((response) => response.json())
            .then(
              (data) =>
                data &&
                setCurrentList({
                  id: currentList.id,
                  name: currentList.name,
                  entries: data,
                })
            )
        }
      />
    </div>
  );
}

export default App;
