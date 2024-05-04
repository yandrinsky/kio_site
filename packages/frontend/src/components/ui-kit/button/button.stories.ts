import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './button.component';

const meta = {
  title: 'ui/button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    theme: {
      description: 'The theme of the button',
      control: 'radio'
    },
    size: {
      description: 'The size of the button',
      control: 'radio'
    }
  },
  args: {
    onClick: fn(),
    children: 'Button'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: 'Button'
  }
};

export const Primary: Story = {
  args: {
    children: 'Button',
    theme: 'accent'
  }
};

export const Error: Story = {
  args: {
    children: 'Button',
    theme: 'colored-red'
  }
};

export const Long: Story = {
  args: {
    children: 'Button',
    size: 'long'
  }
};
export const XLong: Story = {
  args: {
    children: 'Button',
    size: 'xlong'
  }
};
export const XXLong: Story = {
  args: {
    children: 'Button',
    size: 'xxlong'
  }
};
