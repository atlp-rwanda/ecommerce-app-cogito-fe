import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Blue: Story = {
  args: {
    label: 'Blue Button',
    backgroundColor: 'Blue',
  },
};

export const Green: Story = {
  args: {
    label: 'Green Button',
    backgroundColor: 'Green',
  },
};
