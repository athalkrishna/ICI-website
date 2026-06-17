export function isPortalRoute(pathname: string) {
  return pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
}
