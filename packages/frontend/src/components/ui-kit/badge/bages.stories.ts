import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Badge } from './badge.component';

const meta = {
  title: 'ui/badge',
  component: Badge,
  parameters: {
    layout: 'centered'
  },

  argTypes: {
    width: {
      description: 'The width of the badge',
      control: 'number',
      table: {
        category: 'size'
      }
    },
    height: {
      description: 'The height of the badge',
      control: 'number',
      table: {
        category: 'size'
      }
    },
    src: {
      description: 'The source of the image'
    },
    to: {
      description: 'The link to which the badge will redirect'
    },
    children: {
      description: 'The text inside the badge'
    }
  },

  args: {
    width: 30,
    height: 30
  },

  tags: ['autodocs']
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: 'Badge',
    src: 'https://placehold.co/60x60'
  }
};
