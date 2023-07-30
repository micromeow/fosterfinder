import { ExpectedError } from './expected-error';

describe('ExpectedError', () => {
  test('should create an instance with a string message', () => {
    const error = new ExpectedError('error', 400);
    expect(error.content).toBe('error');
    expect(error.errorCode).toBe(400);
  });

  test('should create an instance with an object message', () => {
    const error = new ExpectedError({ message: 'error' }, 400);
    expect(error.content).toMatchObject({ message: 'error' });
    expect(error.errorCode).toBe(400);
  });

  test('should create an instance with a default error code', () => {
    const error = new ExpectedError('error');
    expect(error.content).toBe('error');
    expect(error.errorCode).toBe(500);
  });
});
