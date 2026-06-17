type AuthConfigNoticeProps = {
  title?: string;
};

export default function AuthConfigNotice({
  title = 'Sign-in is not configured yet',
}: AuthConfigNoticeProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900 space-y-2"
    >
      <p className="font-semibold">{title}</p>
      <p>
        Add <code className="font-mono text-xs bg-white/80 px-1 rounded">NEXTAUTH_SECRET</code> and{' '}
        <code className="font-mono text-xs bg-white/80 px-1 rounded">NEXTAUTH_URL</code> in your
        server environment variables (Cloudways → Application → Environment Variables), then restart the app.
      </p>
    </div>
  );
}
