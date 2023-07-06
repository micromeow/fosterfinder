'use client';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { signIn } from 'next-auth/react';
import { useState, SyntheticEvent, HTMLAttributes } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from '../ui/Form';
import { Input } from '../ui/Input';

const emailSchema = z.object({
  email: z.string().email('This is not a valid email.'),
});

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<{
    google: boolean;
    email: boolean;
  }>({ google: false, email: false });

  // generate non-email submit handlers
  function generateSubmitHandler(provider: string) {
    return async function onSubmit(event: SyntheticEvent) {
      event.preventDefault();
      setIsLoading({ ...isLoading, [provider]: true });
      await signIn(provider, { callbackUrl: '/' });

      setTimeout(() => {
        setIsLoading({ ...isLoading, [provider]: false });
      }, 10000);
    };
  }

  const googleSubmitHandler = generateSubmitHandler('google');

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  async function emailSubmitHandler(formValues: z.infer<typeof emailSchema>) {
    setIsLoading({ ...isLoading, email: true });
    await signIn('email', { ...formValues });

    setTimeout(() => {
      setIsLoading({ ...isLoading, email: false });
    }, 10000);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(emailSubmitHandler)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="micromeow@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="outline"
            type="submit"
            disabled={isLoading.email}
            className={'w-full'}
          >
            {isLoading.email ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.media className="mr-2 h-4 w-4" />
            )}{' '}
            Login With Email
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading.google}
        onClick={googleSubmitHandler}
      >
        {isLoading.google ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.media className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </Button>
    </div>
  );
}
