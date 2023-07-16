import { withErrorHandling } from '@/lib/api/with-error-handling';
import { authOptions } from '@/lib/auth/next-auth-config';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withErrorHandling(async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    const { email, name, username } = (await req.json()) as {
      email: string;
      name: string;
      username: string;
    };

    if (session?.user?.email !== email)
      return NextResponse.json({
        status: 'error',
        message: 'You are not logged in',
      });

    const user = await prisma.user.update({
      where: {
        email: email,
      },
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
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500 }
    );
  }
});
