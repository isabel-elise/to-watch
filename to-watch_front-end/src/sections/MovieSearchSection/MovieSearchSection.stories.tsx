import type { Meta, StoryObj } from "@storybook/react";

import { MovieSearchSection } from "./MovieSearchSection";
import { fn } from "@storybook/test";

const meta = {
  component: MovieSearchSection,
  args: {
    onSearchMovie: fn(),
    onGetMovie: fn(),
    onAddMovie: fn(),
    onAddList: fn(),
  },
} satisfies Meta<typeof MovieSearchSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
