import { Meta, StoryObj } from '@storybook/react';
import { Loader } from './loader.component';

const meta = {
  title: 'ui/loader',
  component: Loader,

  argTypes: {},

  tags: ['autodocs']
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {}
};

export const BlueToCyan: Story = {
  args: {
    theme: 'blueToCyan'
  }
};

export const VioletToMagenta: Story = {
  args: {
    theme: 'violetToMagenta'
  }
};
