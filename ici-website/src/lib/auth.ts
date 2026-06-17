import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma, hasDatabaseUrl } from './prisma';
import type { UserRole } from '@prisma/client';

const BCRYPT_ROUNDS = 12;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateTempPassword(length = 12) {
  const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
    };
  }
  interface User {
    role: UserRole;
    sessionMode?: 'browser' | 'persistent';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    sessionMode?: 'browser' | 'persistent';
  }
}

const STUDENT_SESSION_MAX_AGE = 30 * 24 * 60 * 60;
const ADMIN_SESSION_MAX_AGE = 12 * 60 * 60;

function isAdminRole(role: UserRole) {
  return role === 'ADMIN' || role === 'SUPER_ADMIN';
}

function sessionMaxAgeForRole(role: UserRole, sessionMode?: 'browser' | 'persistent') {
  if (sessionMode === 'persistent') return STUDENT_SESSION_MAX_AGE;
  if (sessionMode === 'browser') return ADMIN_SESSION_MAX_AGE;
  return isAdminRole(role) ? ADMIN_SESSION_MAX_AGE : STUDENT_SESSION_MAX_AGE;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        sessionMode: { label: 'Session Mode', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (!hasDatabaseUrl()) {
          console.error('[auth] DATABASE_URL is not set');
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase().trim() },
          });

          if (!user || user.status !== 'ACTIVE') return null;

          const valid = await verifyPassword(credentials.password, user.password);
          if (!valid) return null;

          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            sessionMode:
              credentials.sessionMode === 'browser' || credentials.sessionMode === 'persistent'
                ? credentials.sessionMode
                : isAdminRole(user.role)
                  ? 'browser'
                  : 'persistent',
          };
        } catch (error) {
          console.error('[auth] authorize failed:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: STUDENT_SESSION_MAX_AGE,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.sessionMode = user.sessionMode;
        const maxAge = sessionMaxAgeForRole(user.role, user.sessionMode);
        token.exp = Math.floor(Date.now() / 1000) + maxAge;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export async function getSession() {
  return getSafeServerSession();
}

export function isAuthConfigured() {
  return Boolean(process.env.NEXTAUTH_SECRET?.trim());
}

export async function getSafeServerSession() {
  if (!isAuthConfigured()) {
    console.warn('[auth] NEXTAUTH_SECRET is not set');
    return null;
  }
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error('[auth] getServerSession failed:', error);
    return null;
  }
}

export async function getSessionStrict() {
  return getServerSession(authOptions);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session?.user?.id) return null;
  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') return null;
  return session;
}

export async function requireSuperAdmin() {
  const session = await getSession();
  if (!session?.user?.id || session.user.role !== 'SUPER_ADMIN') return null;
  return session;
}

export async function requireStudent() {
  const session = await getSession();
  if (!session?.user?.id || session.user.role !== 'STUDENT') return null;
  return session;
}

export async function requireAnyAuth() {
  const session = await getSession();
  if (!session?.user?.id) return null;
  return session;
}
