import { redirect } from 'next/navigation';
import { getSafeServerSession } from '@/lib/auth';

export default async function AccountPage() {
  const session = await getSafeServerSession();

  if (!session?.user) {
    redirect('/login');
  }

  if (session.user.role === 'STUDENT') {
    redirect('/dashboard');
  }

  if (session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN') {
    redirect('/admin');
  }

  redirect('/login');
}
