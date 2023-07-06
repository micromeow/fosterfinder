import RegistrationForm from '@/components/register/RegistrationForm';
import { getUser } from '@/lib/queries/get-user';
import { Icons } from '@/components/icons';

export default async function RegistrationPage() {
  const user = await getUser();

  if (!user || !user.email) return null;
  return (
    <div className="container relative grid h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex  flex-col justify-center space-y-6 ">
        <div className="flex justify-center">
          <Icons.media className="h-16 w-16" />
        </div>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Create an Account
          </h1>
        </div>
        <RegistrationForm email={user.email} />
      </div>
    </div>
  );
}
