import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore
import { Input } from '@/components/ui/Input';

const meta: Meta<typeof Input> = {
  title: 'Example/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {},
};
