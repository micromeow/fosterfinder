import { RefinementCtx } from 'zod';
import { prisma } from '../prisma';
/**
 * Checks if username exists in the database and adds an issue to the ctx if it is. To be used inside of a zod `superRefine` function.
 * @param ctx zod refinement context
 * @param username username to check
 * @param message message to add to the issue
 * @param path path to the username field in the schema
 * @returns
 * @example
 * await updateUserSchema
 * .superRefine(async (val, ctx) => {
 * 	//check if username is taken
 * 	await refineUsernameIsTaken(ctx, username);
 * }).parseAsync(data);
 */
export default async function refineUsernameIsTaken(
  ctx: RefinementCtx,
  username: string,
  message = 'Username is taken',
  path: (string | number)[] = ['username']
) {
  const userWithUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (!!userWithUsername)
    ctx.addIssue({
      code: 'custom',
      message,
      path,
    });
}
