import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore
import { CenterMessage } from '@/components/ui/CenterMessage';

const meta: Meta<typeof CenterMessage> = {
  title: 'Example/CenterMessage',
  component: CenterMessage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CenterMessage>;

export const Primary: Story = {
  args: {
    children: 'This is a center message',
  },
};
