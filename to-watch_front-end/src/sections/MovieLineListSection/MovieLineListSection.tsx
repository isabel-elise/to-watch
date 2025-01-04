import { MovieLine } from "../../components/MovieLine/MovieLine";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MovieList } from "../../interfaces";
import { RiCloseCircleLine, RiSave3Line } from "react-icons/ri";

import "./movieLineListSection.css";

export interface MovieLineListSectionProps {
  currentList: MovieList;
  avaiableLists: { id: number; name: string }[];
  onSelectList: (id: number, name: string) => void;
  onSaveList: (id: number, order: number[]) => void;
  onRemoveList: (id: number) => void;
}

export function MovieLineListSection({
  currentList,
  avaiableLists,
  onSelectList,
  onSaveList,
  onRemoveList,
}: MovieLineListSectionProps) {
  const [parent] = useAutoAnimate();
  return (
    <section className="movie-line-list-section">
      {currentList && currentList.entries && (
        <>
          <header className="movie-line-list-header">
            <div>{currentList && currentList.name}</div>
            <button
              id="save-list"
              onClick={() => {
                onSaveList(
                  currentList.id,
                  currentList.entries.map((entry) => entry.id)
                );
              }}
            >
              <RiSave3Line size="1.4em" />
            </button>
          </header>
          <section className="movie-line-list" ref={parent}>
            {currentList &&
              currentList.entries.map((movie) => {
                return (
                  <MovieLine
                    name={movie.title}
                    imdbRating={movie.rating}
                    key={movie.id}
                  />
                );
              })}
          </section>
          <footer className="movie-line-list-footer">
            {avaiableLists &&
              avaiableLists.map((list) => {
                return (
                  <button
                    key={list.id}
                    className={
                      "select-list" +
                      (currentList.id === list.id ? " selected" : "")
                    }
                    onClick={() =>
                      list.id !== currentList.id
                        ? onSelectList(list.id, list.name)
                        : onRemoveList(list.id)
                    }
                  >
                    {list.name}
                    {currentList.id === list.id && (
                      <RiCloseCircleLine size="1.4em" />
                    )}
                  </button>
                );
              })}
          </footer>
        </>
      )}
    </section>
  );
}
