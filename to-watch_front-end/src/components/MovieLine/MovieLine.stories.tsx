import type { Meta, StoryObj } from "@storybook/react";

import { MovieLine } from "./MovieLine";

const meta = {
  component: MovieLine,
} satisfies Meta<typeof MovieLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "No Game, No Life",
    imdbRating: 7.6,
  },
};
