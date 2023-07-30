import UpdateUserForm from '@/components/forms/UpdateUserForm';
import { getUser } from '@/lib/queries/get-user';

export default async function RegistrationPage() {
  const user = await getUser();

  if (!user || !user.email) return null;

  return (
    <div className="container relative grid h-screen w-screen flex-col items-center justify-center">
      <UpdateUserForm user={user} />
    </div>
  );
}
