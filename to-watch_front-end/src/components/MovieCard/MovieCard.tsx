import { MovieEntry } from "../../interfaces";
import "./movieCard.css";

export function MovieCard({
  id,
  title,
  year,
  kind,
  cover_url,
  rating,
}: MovieEntry) {
  return (
    <div className="card-container" key={id}>
      <header className="card-header">
        <h1>{title}</h1>
        <h1 className="imdb-score">{rating}</h1>
      </header>
      <section className="card-body">
        <img src={cover_url} />
        <section className="card-data">
          <h2>
            {kind}
            <br />
            {year}
          </h2>
        </section>
      </section>
    </div>
  );
}
