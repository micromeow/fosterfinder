import { withErrorHandling } from '@/lib/api/with-error-handling';
import { authOptions } from '@/lib/auth/next-auth-config';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import userDetailsFormSchema from '@/lib/zod-schema/user-details.schema';
import refineUsernameIsTaken from '@/lib/zod-refine/refine-username-is-taken';

export const PATCH = withErrorHandling(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  const data = (await req.json()) as {
    id: string;
    email: string;
    name: string;
    username: string;
  };

  const { id, email, name, username } = data;

  if (session?.user?.email !== email)
    return NextResponse.json({
      status: 'error',
      message: 'You are not logged in',
    });

  await userDetailsFormSchema
    .superRefine(async (val, ctx) => {
      //check if username is taken
      await refineUsernameIsTaken(ctx, username);
    })
    .parseAsync(data);

  const user = await prisma.user.update({
    where: { id: id },
    data: {
      name: name,
      username: username.toLowerCase(),
    },
  });

  return NextResponse.json({
    user: {
      name: user.name,
      username: user.username,
    },
  });
});
