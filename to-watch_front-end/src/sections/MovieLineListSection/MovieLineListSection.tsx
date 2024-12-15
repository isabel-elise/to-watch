import { MovieLine } from "../../components/MovieLine/MovieLine";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MovieList } from "../../interfaces";

import "./movieLineListSection.css";
import { RiSave3Line } from "react-icons/ri";

export interface MovieLineListSectionProps {
  currentList: MovieList;
  avaiableLists: { id: number; name: string }[];
  onSelectList: (id: number) => void;
  onSaveList: (id: number, newOrder: number[]) => void;
}

export function MovieLineListSection({
  currentList,
  avaiableLists,
  onSelectList,
  onSaveList,
}: MovieLineListSectionProps) {
  const [parent] = useAutoAnimate();
  return (
    <section className="movie-line-list-section">
      <header className="movie-line-list-header">
        <div>{currentList.name}</div>
        <button
          id="save-list"
          onClick={() => {
            alert("Salvando lista: " + currentList.name);
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
        {currentList.entries.map((movie) => {
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
        {avaiableLists.map((list) => {
          return (
            <button
              key={list.id}
              className={
                "select-list" + (currentList.id === list.id ? " selected" : "")
              }
              onClick={() =>
                list.id !== currentList.id && onSelectList(list.id)
              }
            >
              {list.name}
            </button>
          );
        })}
      </footer>
    </section>
  );
}
