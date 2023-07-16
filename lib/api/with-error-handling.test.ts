/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from 'next/server';
import { ExpectedError } from './expected-error';
import {
  internalErrorResponse,
  objectErrorNextResponse,
  simpleErrorNextResponse,
  withErrorHandling,
  zodErrorNextResponse,
} from './with-error-handling';

describe('withErrorHandling', () => {
  test('should return the result of the function', async () => {
    const fn = jest.fn().mockResolvedValue('result');
    const result = await withErrorHandling(fn)({} as NextRequest);
    expect(result).toBe('result');
  });

  test('should return an error response if the function throws an ExpectedError', async () => {
    const fn = jest.fn().mockRejectedValue(new ExpectedError('error', 400));
    const result = (await withErrorHandling(fn)(
      {} as NextRequest
    )) as NextResponse;
    const body = await result.json();
    expect(body).toMatchObject({
      message: 'error',
      status: 'error',
    });
  });

  test('should return an error response if the function throws an ExpectedError with an object message', async () => {
    const fn = jest
      .fn()
      .mockRejectedValue(new ExpectedError({ message: 'error' }, 400));
    const result = (await withErrorHandling(fn)(
      {} as NextRequest
    )) as NextResponse;
    const body = await result.json();
    expect(body).toMatchObject({
      status: 'error',
      reason: { message: 'error' },
    });
  });

  test('should return an internal error response if the function throws an unexpected error', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('error'));
    const result = (await withErrorHandling(fn)(
      {} as NextRequest
    )) as NextResponse;
    const body = await result.json();
    expect(body).toMatchObject({
      message: 'Internal server error',
      status: 'error',
    });
  });
});

describe('simpleErrorNextResponse', () => {
  test('should return a NextResponse with the correct status code and body', async () => {
    const result = simpleErrorNextResponse('error', 400);
    const body = await result.json();
    expect(result.status).toBe(400);
    expect(body).toMatchObject({ status: 'error', message: 'error' });
  });
});

describe('objectErrorNextResponse', () => {
  test('should return a NextResponse with the correct status code and body', async () => {
    const result = objectErrorNextResponse({ message: 'error' }, 400);
    const body = await result.json();
    expect(result.status).toBe(400);
    expect(body).toMatchObject({
      status: 'error',
      reason: { message: 'error' },
    });
  });
});

describe('zodErrorNextResponse', () => {
  test('should return a NextResponse with the correct status code and body', async () => {
    const result = zodErrorNextResponse(
      [
        {
          code: 'custom',
          message: 'error',
          path: ['username'],
        },
      ],
      400
    );
    const body = await result.json();
    expect(result.status).toBe(400);
    expect(body).toMatchObject({
      status: 'error',
      issues: [
        {
          code: 'custom',
          message: 'error',
          path: ['username'],
        },
      ],
    });
  });
});

describe('internalErrorResponse', () => {
  test('should return a NextResponse with the correct status code and body', async () => {
    const result = internalErrorResponse();
    const body = await result.json();
    expect(result.status).toBe(500);
    expect(body).toMatchObject({
      status: 'error',
      message: 'Internal server error',
    });
  });
});
