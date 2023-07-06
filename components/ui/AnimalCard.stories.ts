import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore
import { AnimalCard } from '@/components/ui/AnimalCard';

const meta: Meta<typeof AnimalCard> = {
  title: 'Example/AnimalCard',
  component: AnimalCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AnimalCard>;

const date = new Date('2020-04-13T00:00:00.000+08:00');

export const Primary: Story = {
  args: {
    name: 'Animal',
    birthday: new Date(), // Renders as birthday on the component
    category: 'Dog',
    status: 'Available',
    createdAt: date,
    modifiedAt: date,
  },
};
