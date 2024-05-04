import { Meta } from '@storybook/react';
import { Modal } from './modal.comoponenxt';
import { useState } from 'react';

import { Button } from '../button/button.component'; // Add missing import
import { within } from '@storybook/test';

const meta = {
  title: 'ui/modal',
  component: Modal,
  subcomponents: { Button: Button as React.ComponentType<unknown> }, // Update the type of subcomponents

  argTypes: {
    isOpen: {
      description: 'Whether the modal is open or not',
      control: {
        type: 'boolean'
      }
    },
    onClose: {
      description: 'Callback when the modal is closed',
      action: 'onClose'
    }
  },

  tags: ['autodocs']
} satisfies Meta<typeof Modal>;

export default meta;

export const Base = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(e => !e)}>Open</Button>
        <Modal isOpen={open} onClose={() => setOpen(e => !e)}>
          Proident elit ipsum enim esse occaecat veniam nostrud sint mollit occaecat. Enim proident laborum
          aliquip ut eiusmod ea. Pariatur magna qui amet adipisicing in aute ad cupidatat sint.
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByText('Open');
    button.click();
  }
};
