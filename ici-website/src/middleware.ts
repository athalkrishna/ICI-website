import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths under /admin, EXCEPT:
     * - /admin/login
     */
    '/admin/((?!login).*)',
  ],
};
