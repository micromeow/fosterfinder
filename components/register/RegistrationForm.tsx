'use client';

import * as z from 'zod';
import { Button } from '../ui/Button';
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from '../ui/Form';
import { Icons } from '../icons';
import { Input } from '../ui/Input';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters',
    })
    .max(50, {
      message: 'Name must be at most 50 characters.',
    }),
  username: z
    .string()
    .min(10, {
      message: 'Username must be at least 10 characters.',
    })
    .max(50, {
      message: 'Username must be at most 50 characters.',
    }),
});

type Props = {
  email: string;
};

function RegistrationForm({ email }: Props) {
  let [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
    },
  });

  const onSubmit = async (formValues: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email: email, ...formValues }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: '/' });
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input disabled placeholder={email} />
          </FormControl>
          <FormDescription>
            This is the email you are using to register.
          </FormDescription>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Mister Bartholomew" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="bartholomew" {...field} />
              </FormControl>
              <FormDescription>This is your username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          type="submit"
          disabled={loading}
          className={'w-full'}
        >
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.media className="mr-2 h-4 w-4" />
          )}{' '}
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

export default RegistrationForm;
