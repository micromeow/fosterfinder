import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore
import { Form } from '@/components/ui/Form';

const meta: Meta<typeof Form> = {
  title: 'Example/Form',
  component: Form,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  args: {},
};
