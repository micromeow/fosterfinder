import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore
import { __component__ } from '@/components/ui/__component__';

const meta: Meta<typeof __component__> = {
  title: 'Example/__component__',
  component: __component__,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof __component__>;

export const Primary: Story = {
  args: {},
};
