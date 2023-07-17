'use client';

import * as z from 'zod';
import { Button } from './Button';
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from './Form';
import { Icons } from '../icons';
import { Input } from './Input';
import userDetailsFormSchema from '@/lib/zod-schema/user-details.schema';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  email: string;
  onSubmit: (
    formValues: z.infer<typeof userDetailsFormSchema>
  ) => Promise<void>;
  loading: boolean;
  form: UseFormReturn<
    {
      name: string;
      username: string;
    },
    any,
    undefined
  >;
  submitText?: string;
};

export function UserDetailsForm({
  email,
  form,
  loading,
  onSubmit,
  submitText = 'Sign Up',
}: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input disabled placeholder={email} />
          </FormControl>
          <FormDescription>
            This is the email associated to your account.
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
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
