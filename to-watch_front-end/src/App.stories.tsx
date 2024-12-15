import type { Meta, StoryObj } from "@storybook/react";

import App from "./App";
import { searchMovieMock, getMovieMock, mockList1 } from "./requests.mock";
import { changeListOrder } from "./methods";

const meta = {
  component: App,
  args: {
    searchMovie: searchMovieMock,
    getMovie: getMovieMock,
    mockList1: mockList1,
    changeListOrder: changeListOrder,
  },
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
