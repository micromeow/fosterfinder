import { useCallback } from 'react';
import { FieldError, UseFormSetError } from 'react-hook-form';
import { ZodIssue } from 'zod';
/**
 * A hook that handles Zod errors from the server and appends them to the react hook form.
 * @param setError The `setError` function from react hook form.
 * @example
 * ```ts
 * const { setError } = useForm();
 * const setZodServerIssues = useSetZodServerIssues(setError);
 * const onSubmit = handleSubmit(async (data) => {
 * 	const response = await fetch('/api/register', ...);
 * 	if (response.ok) {
 * 			// handle success
 * 	} else {
 * 		const body = await response.json();
 * 		if (body.issues) setZodServerIssues(body.issues);
 * 	}
 * });
 * ```
 * @see
 */
export const useSetZodServerIssues = (setError: UseFormSetError<any>) =>
  useCallback(
    (zodIssues: ZodIssue[]) => {
      //Adapted from https://github.com/react-hook-form/resolvers/blob/master/zod/src/types.ts
      const errors: Record<string, FieldError> = {};
      for (; zodIssues.length; ) {
        const error = zodIssues[0];
        const { code, message, path } = error;
        const _path = path.join('.');

        if (!errors[_path]) {
          if ('unionErrors' in error) {
            const unionError = error.unionErrors[0].errors[0];

            errors[_path] = {
              message: unionError.message,
              type: unionError.code,
            };
          } else {
            errors[_path] = { message, type: code };
          }
        }

        if ('unionErrors' in error) {
          error.unionErrors.forEach((unionError) =>
            unionError.errors.forEach((e) => zodIssues.push(e))
          );
        }

        zodIssues.shift();
      }

      Object.keys(errors).forEach((path) => {
        setError(path, errors[path]);
      });
    },
    [setError]
  );
