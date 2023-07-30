import { NextRequest, NextResponse } from 'next/server';
import { ExpectedError } from '@/lib/api/expected-error';
import { ZodError, ZodIssue } from 'zod';

const simpleErrorNextResponse = (message: string, code: number) =>
  new NextResponse(JSON.stringify({ status: 'error', message }), {
    status: code,
  });

const objectErrorNextResponse = (obj: object, code: number) =>
  new NextResponse(JSON.stringify({ status: 'error', reason: obj }), {
    status: code,
  });

const zodErrorNextResponse = (issues: ZodIssue[], code: number) =>
  new NextResponse(JSON.stringify({ status: 'error', issues }), {
    status: code,
  });

const internalErrorResponse = () =>
  new NextResponse(
    JSON.stringify({ status: 'error', message: 'Internal server error' }),
    {
      status: 500,
    }
  );

/**
 * A wrapper for Next.js API routes that handles errors. This function should be used as the handler for all API routes. It will catch any errors thrown by the route handler and return an appropriate response. Throw an `ExpectedError` to return a custom error response to the client.
 * @param fn The route handler function.
 * @returns The result of the function, or an error response.
 * @example
 * ```ts
 * export const POST = withErrorHandling(async (req: NextRequest) => {
 *  throw new ExpectedError('You must be logged in to do that.', 401);
 * });
 * ```
 */
const withErrorHandling =
  <T>(fn: (req: NextRequest) => Promise<T>) =>
  async (req: NextRequest) => {
    try {
      return await fn(req);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return zodErrorNextResponse(error.issues, 400);
      }

      if (error instanceof ExpectedError) {
        // handle string message
        if (typeof error.content == 'string')
          return simpleErrorNextResponse(error.content, error.errorCode);
        // handle object message
        return objectErrorNextResponse(error.content, error.errorCode);
      }

      //TODO: Log unexpected errors into the database
      return internalErrorResponse();
    }
  };

export {
  withErrorHandling,
  simpleErrorNextResponse,
  zodErrorNextResponse,
  objectErrorNextResponse,
  internalErrorResponse,
};
