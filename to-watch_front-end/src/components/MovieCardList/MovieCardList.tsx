import { MovieCard, MovieCardProps } from "../MovieCard/MovieCard";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import { IconContext } from "react-icons";

import "./movieCardList.css";

interface MovieCardListProps {
  movieCardList: MovieCardProps[];
  onChangeListOrder: (movieId: string, operation: string) => void;
}

export function MovieCardList({
  movieCardList: list,
  onChangeListOrder,
}: MovieCardListProps) {
  return (
    <div className="list-container">
      {list.map((entry) => {
        return (
          <div className="list-card-container">
            <MovieCard {...entry} />
            <IconContext.Provider
              value={{ size: "1.25em", className: "change-order-button" }}
            >
              <section className="buttons-section">
                <RiArrowUpDoubleLine
                  onClick={() => onChangeListOrder(entry.id, "first")}
                />
                <RiArrowUpSLine
                  onClick={() => onChangeListOrder(entry.id, "up")}
                />
                <RiArrowDownSLine
                  onClick={() => onChangeListOrder(entry.id, "down")}
                />
                <RiArrowDownDoubleLine
                  onClick={() => onChangeListOrder(entry.id, "last")}
                />
              </section>
            </IconContext.Provider>
          </div>
        );
      })}
    </div>
  );
}
