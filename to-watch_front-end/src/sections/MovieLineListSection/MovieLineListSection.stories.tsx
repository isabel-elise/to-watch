import type { Meta, StoryObj } from "@storybook/react";

import { MovieLineListSection } from "./MovieLineListSection";
import { fn } from "@storybook/test";

const meta = {
  component: MovieLineListSection,
} satisfies Meta<typeof MovieLineListSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelectList: fn(),
    avaiableLists: [
      { id: 9090, name: "Lista 1" },
      { id: 123, name: "Lista 2" },
      { id: 124, name: "Lista 3" },
    ],
    currentList: {
      id: 9090,
      name: "Lista 1",
      entries: [
        {
          id: 2580046,
          imdbID: "",
          title: "Miraculous: Tales of Ladybug & Cat Noir",
          year: 2015,
          kind: "tv series",
          coverUrl:
            "https://m.media-amazon.com/images/M/MV5BODQ5NGFjZTQtNDkzNy00YWVjLWJiNGMtNTk1YzVmMmQ1YWQwXkEyXkFqcGc@.jpg",
          rating: 7.5,
        },
        {
          id: 3431758,
          imdbID: "",
          title: "No Game, No Life",
          year: 2014,
          kind: "tv series",
          coverUrl:
            "https://m.media-amazon.com/images/M/MV5BOTk5ZDZhNGUtMDM2OS00Y2RkLWEwMmQtODg4ZTZiMGY1ZjFjXkEyXkFqcGc@.jpg",
          rating: 7.6,
        },
      ],
    },
  },
};
