import type { Meta, StoryObj } from "@storybook/react";

import { MovieSearchSection } from "./MovieSearchSection";
import { SearchResult } from "../../components/SearchBar/SearchBar";
import { fn } from "@storybook/test";
import { MovieCardProps } from "../../components/MovieCard/MovieCard";

const meta = {
  component: MovieSearchSection,
  args: {
    onSearchMovie: () => {
      const myPromise = new Promise<SearchResult[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              imdbID: "2580046",
              title: "Miraculous: Tales of Ladybug & Cat Noir",
              year: "2015",
              kind: "tv series",
              coverUrl:
                "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
            },
            {
              imdbID: " 3431758",
              title: "No Game, No Life",
              year: "2014",
              kind: "tv series",
              coverUrl:
                "https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@.jpg",
            },
          ]);
        }, 300);
      });
      return myPromise;
    },
    onGetMovie: () => {
      const myPromise = new Promise<MovieCardProps>((resolve) => {
        setTimeout(() => {
          resolve({
            id: "2580046",
            title: "Miraculous: Tales of Ladybug & Cat Noir",
            year: 2015,
            kind: "tv series",
            coverUrl:
              "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
            imdbRating: 7.5,
            watched: false,
          });
        }, 300);
      });
      return myPromise;
    },
    onAddMovieToWatch: fn(),
  },
} satisfies Meta<typeof MovieSearchSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
