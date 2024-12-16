import type { Meta, StoryObj } from "@storybook/react";

import { MovieCardListSection } from "./MovieCardListSection";
import { fn } from "@storybook/test";

const meta = {
  component: MovieCardListSection,
  args: {
    onChangeListOrder: fn(),
  },
} satisfies Meta<typeof MovieCardListSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movieList: [
      {
        id: 2580046,
        imdb_id: "2580046",
        title: "Miraculous: Tales of Ladybug & Cat Noir",
        year: 2015,
        kind: "tv series",
        cover_url:
          "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
        rating: 7.5,
      },
      {
        id: 3431758,
        imdb_id: "3431758",
        title: "No Game, No Life",
        year: 2014,
        kind: "tv series",
        cover_url:
          "https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@.jpg",
        rating: 7.6,
      },
    ],
  },
};
