import { MovieCard } from "../MovieCard/MovieCard";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import "./movieCardList.css";
import { MovieEntry } from "../../interfaces";

interface MovieCardListProps {
  movieCardList: MovieEntry[];
  onChangeListOrder: (index: number, operation: string) => void;
}

export function MovieCardList({
  movieCardList: list,
  onChangeListOrder,
}: MovieCardListProps) {
  const [parent] = useAutoAnimate();
  return (
    <div className="list-container" ref={parent}>
      {list.map((entry, index) => {
        return (
          <div className="list-card-container" key={entry.id}>
            <MovieCard {...entry} />
            <IconContext.Provider
              value={{ size: "1.25em", className: "change-order-button" }}
            >
              <section className="buttons-section">
                {index !== 0 && (
                  <>
                    <RiArrowUpDoubleLine
                      onClick={() => onChangeListOrder(index, "first")}
                    />
                    <RiArrowUpSLine
                      onClick={() => onChangeListOrder(index, "up")}
                    />
                  </>
                )}
                {index !== list.length - 1 && (
                  <>
                    <RiArrowDownSLine
                      onClick={() => onChangeListOrder(index, "down")}
                    />
                    <RiArrowDownDoubleLine
                      onClick={() => onChangeListOrder(index, "last")}
                    />
                  </>
                )}
              </section>
            </IconContext.Provider>
          </div>
        );
      })}
    </div>
  );
}
