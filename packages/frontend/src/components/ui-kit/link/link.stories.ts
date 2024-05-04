import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Link } from './link.component';

const meta = {
  title: 'ui/link',
  component: Link,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    theme: {
      description: 'The theme of the button',
      control: 'radio'
    },
    size: {
      description: 'The size of the button'
    },
    isAlert: {
      description: 'Show input error',
      control: 'boolean'
    },
    to: {
      description: 'The URL to navigate to when the link is clicked'
    }
  },
  args: {
    to: '/',
    children: 'Link',
    isAlert: false
  },
  tags: ['autodocs']
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {}
};

export const Primary: Story = {
  args: {
    theme: 'accent',
    isAlert: false
  }
};

export const Underline: Story = {
  args: {
    theme: 'underline'
  }
};

export const Block: Story = {
  args: {
    theme: 'block-hover'
  },
  parameters: {}
};

export const Alert: Story = {
  args: {
    isAlert: true
  }
};

export const XLong: Story = {
  args: {
    size: 'xlong',
    theme: 'accent'
  }
};

export const XXLong: Story = {
  args: {
    size: 'xxlong',
    theme: 'accent'
  }
};
