import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input.components';

const meta = {
  title: 'ui/input',
  component: Input,

  argTypes: {
    stretch: {
      description: 'Stretch the input to the full width of the parent container',
      control: 'boolean'
    },
    isError: {
      description: 'Show input error',
      control: 'boolean'
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    stretch: false,
    isError: false
  }
};

export const Scratched: Story = {
  args: {
    stretch: true,
    isError: false
  }
};

export const Error: Story = {
  args: {
    stretch: false,
    isError: true
  }
};
