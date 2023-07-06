import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore
import { Label } from '@/components/ui/Label';

const meta: Meta<typeof Label> = {
  title: 'Example/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Primary: Story = {
  args: {
    children: 'This is a label',
  },
};
