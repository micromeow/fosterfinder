import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore
import { UserDetailsForm } from '@/components/ui/UserDetailsForm';

const meta: Meta<typeof UserDetailsForm> = {
  title: 'Example/UserDetailsForm',
  component: UserDetailsForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserDetailsForm>;

export const Primary: Story = {
  args: {},
};
