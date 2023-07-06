jest.mock('next-auth', () => ({
  getServerSession: jest.fn().mockResolvedValue({ user: { id: '123' } }),
}));

import { getServerSession } from 'next-auth';
import { isSessionValid, verifyUserSession } from './verify-user-session';

describe('verifyUserSession', () => {
  it('returns session if session is valid', async () => {
    const session = await verifyUserSession();
    expect(session).toMatchObject({
      user: { id: '123' },
    });
  });
  it('throws an error if session is invalid', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);
    await expect(verifyUserSession()).rejects.toThrowError('invalid session');
  });
});

describe('isSessionValid', () => {
  it('returns true if session is valid', () => {
    const session = {
      user: { id: '123' },
    };
    expect(isSessionValid(session)).toBe(true);
  });
  it('returns false if session is null', () => {
    const session = null;
    expect(isSessionValid(session)).toBe(false);
  });
  it('returns false if session.user is null', () => {
    const session = { user: null };
    expect(isSessionValid(session)).toBe(false);
  });
  it('returns false if session.user.id is null', () => {
    const session = { user: { id: null } };
    expect(isSessionValid(session)).toBe(false);
  });
  it('returns false if session.user.id is not a string', () => {
    const session = { user: { id: 123 } };
    expect(isSessionValid(session)).toBe(false);
  });
});
