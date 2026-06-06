import Image from 'next/image'
import Link from 'next/link'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Log In - International Coaching Institute',
  description: 'Log in to your International Coaching Institute account.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Left Column - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-[600px] lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-full">
          <div>
            <h2 className="mt-8 font-display text-3xl font-bold tracking-tight text-navy-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-gold-600 hover:text-gold-500 transition-colors">
                Apply today
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-navy-900">
                    Email address
                  </label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-2.5 pl-10 text-navy-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-gold-500 sm:text-sm sm:leading-6 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-navy-900">
                    Password
                  </label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-2.5 pl-10 text-navy-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-gold-500 sm:text-sm sm:leading-6 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-neutral-300 text-gold-600 focus:ring-gold-500"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-neutral-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm leading-6">
                    <Link href="/forgot-password" className="font-semibold text-gold-600 hover:text-gold-500 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center items-center gap-2 rounded-md bg-navy-800 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-navy-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600 transition-colors"
                  >
                    Sign in
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
          alt="Students learning together"
          fill
          priority
        />
        <div className="absolute inset-0 bg-navy-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
        
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h3 className="font-display text-4xl font-bold mb-4">Empowering global leaders.</h3>
          <p className="text-lg text-neutral-200 max-w-2xl">
            Access your courses, connect with peers, and track your progress in the International Coaching Institute platform.
          </p>
        </div>
      </div>
    </div>
  )
}
