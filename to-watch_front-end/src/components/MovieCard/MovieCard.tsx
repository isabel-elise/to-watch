import "./movieCard.css";

export interface MovieCardProps {
  title: string;
  year: number;
  kind: string;
  coverUrl: string;
  imdbRating: number;
  watched: boolean;
}

export function MovieCard({
  title,
  year,
  kind,
  coverUrl,
  imdbRating,
  watched,
}: MovieCardProps) {
  return (
    <div className="card-container">
      <header className="card-header">
        <h1>{title}</h1>
        <h1 className="imdb-score">{imdbRating}</h1>
      </header>
      <section className="card-body">
        <img src={coverUrl} />
        <section className="card-data">
          <h2>
            {kind}
            <br />
            {year}
          </h2>
          <h3 className={watched ? "watched-text" : "not-watched-text"}>
            {watched ? "Assistido" : "Não assistido"}
          </h3>
        </section>
      </section>
    </div>
  );
}
