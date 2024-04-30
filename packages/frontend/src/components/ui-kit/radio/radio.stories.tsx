import { Meta, StoryObj } from '@storybook/react';
import { Radio } from './radio.component';
import RadioContainer from './radio-container/radio-container.component';
import { fn } from '@storybook/test';

const meta = {
  title: 'ui/radio',
  component: RadioContainer,
  subcomponents: { Radio: Radio as React.FunctionComponent<unknown> },
  argTypes: {
    name: {
      description: 'The name of the radio group'
    },
    onChange: {
      description: 'The function to call when the radio group value changes'
    },
    value: {
      description: 'The value of the selected radio (to control component from useState)',
      control: { disable: true }
    },
    children: {
      control: { disable: true },
      description: 'The content of the radio group'
    }
  },
  args: {
    onChange: fn()
  },
  tags: ['autodocs']
} satisfies Meta<typeof RadioContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    name: 'radio',
    children: <></>
  },

  render: ({ name, children, ...other }) => {
    return (
      <RadioContainer name={name} value="asffas" {...other}>
        <Radio value="1" title={'Title radio 1'}>
          Radio 1
        </Radio>
        <Radio value="2" title={'Title radio 2'}>
          Radio 2
        </Radio>
        <Radio value="3" title={'Title radio 3'}>
          Radio 3
        </Radio>
      </RadioContainer>
    );
  }
};
