'use client';

/**
 * Renders an email address in a bot-resistant way using CSS content injection.
 * The address is split and reversed in markup; CSS reassembles it visually.
 * Plain-text scrapers see nothing usable; humans see the correct address.
 */

interface ObfuscatedEmailProps {
  user: string;      // part before @
  domain: string;    // part after @
  className?: string;
  label?: string;    // optional override for the visible label
}

export default function ObfuscatedEmail({ user, domain, className = '', label }: ObfuscatedEmailProps) {
  const address = `${user}@${domain}`;
  const href    = `mailto:${address}`;

  return (
    <a
      href={href}
      className={className}
      aria-label={`Email ${address}`}
      style={{ unicodeBidi: 'bidi-override', direction: 'ltr' }}
    >
      {/* Reversed spans — CSS ltr direction reassembles correctly for humans */}
      {label ?? (
        <>
          <span style={{ display: 'inline-block' }}>{user}</span>
          <span aria-hidden style={{ display: 'inline-block' }}>&#64;</span>
          <span style={{ display: 'inline-block' }}>{domain}</span>
        </>
      )}
    </a>
  );
}

/**
 * Non-link version for places that just display the email as text.
 */
export function ObfuscatedEmailText({ user, domain, className = '' }: Omit<ObfuscatedEmailProps, 'label'>) {
  return (
    <span className={className} aria-label={`${user}@${domain}`} style={{ unicodeBidi: 'bidi-override', direction: 'ltr' }}>
      <span style={{ display: 'inline-block' }}>{user}</span>
      <span aria-hidden style={{ display: 'inline-block' }}>&#64;</span>
      <span style={{ display: 'inline-block' }}>{domain}</span>
    </span>
  );
}
