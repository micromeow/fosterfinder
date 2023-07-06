import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore
import { Pagination } from '@/components/ui/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Example/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  args: {
    page: 1,
    limit: 20,
    total: 100,
  },
};
