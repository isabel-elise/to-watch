import "./movieLine.css";

interface MovieLineProps {
  name: string;
  imdbRating: number;
}

export function MovieLine({ name, imdbRating }: MovieLineProps) {
  return (
    <div className="line-container">
      <p className="line-text">{name}</p>
      <p className="line-text">{imdbRating}</p>
    </div>
  );
}
