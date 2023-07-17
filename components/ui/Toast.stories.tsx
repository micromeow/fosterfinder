import { Button } from './Button';
import { Toast } from './Toast';
import { useToast, toast as shadcnToast } from './use-toast';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Toast> = {
  title: 'Example/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const { toast } = useToast();
      return <Story toast={toast} />;
    },
  ],
};

export default meta;

export const Default = (toast: typeof shadcnToast) => {
  return (
    <Button
      onClick={() => {
        toast({
          title: 'Scheduled: Catch up',
          description: 'Friday, February 10, 2023 at 5:57 PM',
        });
      }}
    >
      Show Toast
    </Button>
  );
};
