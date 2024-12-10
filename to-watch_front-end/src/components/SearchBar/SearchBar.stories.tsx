import type { Meta, StoryObj } from "@storybook/react";

import { SearchBar } from "./SearchBar";
import { fn } from "@storybook/test";

const meta = {
  component: SearchBar,
  args: {
    onSearchMovie: fn(),
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
