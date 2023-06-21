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
    style: 'px-3 py-1'
  },
};

export const Green: Story = {
  args: {
    label: 'Green Button',
    style: 'px-4 py-2'
  },
};
