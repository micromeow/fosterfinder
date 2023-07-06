type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends Date
  ? T
  : {
      [K in keyof T]: T[K] extends (infer U)[]
        ? RecursivelyReplaceNullWithUndefined<U>[]
        : RecursivelyReplaceNullWithUndefined<T[K]>;
    };

/**
 * Recursively replaces null values with undefined values.
 * This is useful for mocking prisma responses, since prisma
 * returns null for missing values, but next-auth returns
 * undefined for missing values.
 * @param obj - object to replace null values with undefined values
 * @returns object with null values replaced with undefined values
 * @example
 * const user = await prisma.user.findUnique({ where: { id: '123' } });
 * const userWithUndefined = nullsToUndefined(user);
 * expect(userWithUndefined).toMatchObject({ id: '123', username: undefined });
 */
export function nullsToUndefined<T>(
  obj: T
): RecursivelyReplaceNullWithUndefined<T> {
  if (obj === null) {
    return undefined as any;
  }

  // object check based on: https://stackoverflow.com/a/51458052/6489012
  if ((obj as any).constructor.name === 'Object') {
    for (let key in obj) {
      obj[key] = nullsToUndefined(obj[key]) as any;
    }
  }
  return obj as any;
}
