'use client';

import * as z from 'zod';
import userDetailsFormSchema from '@/lib/zod-schema/user-details.schema';
import { Icons } from '@/components/icons';
import { UserDetailsForm } from '@/components/ui/UserDetailsForm';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useSetZodServerIssues } from '@/hook/form/useZodServerIssues';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';

type Props = {
  user: User;
};

export default function UpdateUserForm({ user }: Props) {
  let [loading, setLoading] = useState(false);

  const { id, name, username, email, ...rest } = user;

  const form = useForm<z.infer<typeof userDetailsFormSchema>>({
    resolver: zodResolver(userDetailsFormSchema),
    defaultValues: {
      name: name || '',
      username: username || '',
    },
  });

  const setZodServerIssues = useSetZodServerIssues(form.setError);

  const onSubmit = async (
    formValues: z.infer<typeof userDetailsFormSchema>
  ) => {
    setLoading(true);

    try {
      const res = await fetch('/api/update-user', {
        method: 'PATCH',
        body: JSON.stringify({ id: id, email: email, ...formValues }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      if (!res.ok) {
        const body = await res.json();
        setZodServerIssues(body.issues);
        return;
      }

      signIn(undefined, { callbackUrl: '/app' });
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="mx-auto flex  flex-col justify-center space-y-6 ">
      <div className="flex justify-center">
        <Icons.media className="h-16 w-16" />
      </div>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Update Profile
        </h1>
      </div>
      <UserDetailsForm
        email={email || ''}
        onSubmit={onSubmit}
        loading={loading}
        form={form}
        submitText="Update Profile"
      />
    </div>
  );
}
