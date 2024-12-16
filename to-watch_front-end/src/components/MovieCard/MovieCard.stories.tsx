import type { Meta, StoryObj } from "@storybook/react";

import { MovieCard } from "./MovieCard";

const meta = {
  component: MovieCard,
} satisfies Meta<typeof MovieCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 2580046,
    title: "Miraculous: Tales of Ladybug & Cat Noir",
    year: 2015,
    kind: "tv series",
    cover_url:
      "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
    imdb_id: "2580046",
    rating: 7.5,
  },
};
