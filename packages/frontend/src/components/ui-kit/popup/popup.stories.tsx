import { Meta, StoryObj } from '@storybook/react';
import { Popup } from './popup.component';
import { within } from '@storybook/test';

const meta = {
  title: 'ui/popup',
  component: Popup,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    closeOnScroll: {
      description: 'Whether the popup should close on scroll'
    },
    arrow: {
      description: 'Whether the popup should have an arrow'
    }
  },
  args: {
    closeOnScroll: false,
    arrow: false
  },
  tags: ['autodocs']
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: 'Popup text'
  },
  render: ({ children, ...other }) => {
    return (
      <>
        <Popup {...other} trigger={<p style={{ cursor: 'pointer' }}>Click to see popup</p>}>
          <p style={{ padding: '15px 10px', margin: 0 }}>{children}</p>
        </Popup>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByText('Click to see popup');
    trigger.click();
  }
};
