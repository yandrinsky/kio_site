import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './breadcrumbs.component';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

const meta = {
  title: 'ui/breadcrumbs',
  component: Breadcrumbs,

  argTypes: {
    withHelp: {
      control: 'boolean',
      description: 'if true, renders the help button on the right side'
    }
  },

  tags: ['autodocs']
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {}
};

export const DeepBase: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/sign-in/tasks/profile'
      }
    })
  }
};

export const Help: Story = {
  args: {
    withHelp: true
  }
};
