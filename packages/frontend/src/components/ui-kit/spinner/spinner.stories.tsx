import { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner.component';

const meta = {
  title: 'ui/spinner',
  component: Spinner,

  argTypes: {},

  tags: ['autodocs']
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {}
};

export const Yellow: Story = {
  args: {
    theme: 'yellow'
  }
};

export const Brown: Story = {
  args: {
    theme: 'lightBrown'
  }
};
