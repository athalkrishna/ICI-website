'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function mockLogin(formData?: FormData) {
  const cookieStore = await cookies()
  cookieStore.set('ici_mock_auth', 'true', { path: '/' })
  redirect('/account')
}

export async function mockLogout() {
  const cookieStore = await cookies()
  cookieStore.delete('ici_mock_auth')
  redirect('/login')
}
