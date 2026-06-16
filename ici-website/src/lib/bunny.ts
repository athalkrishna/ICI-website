import crypto from 'crypto';

function getConfig() {
  const zone = process.env.BUNNY_STORAGE_ZONE_NAME || process.env.BUNNY_STORAGE_ZONE;
  const apiKey = process.env.BUNNY_STORAGE_API_KEY || process.env.BUNNY_API_KEY;
  const cdnUrl = process.env.BUNNY_CDN_URL;
  const tokenKey = process.env.BUNNY_TOKEN_AUTH_KEY;

  if (!zone || !apiKey || !cdnUrl) {
    throw new Error('Bunny.net configuration missing');
  }

  return { zone, apiKey, cdnUrl, tokenKey };
}

export async function uploadToBunny(
  buffer: ArrayBuffer,
  fileName: string,
  mimeType: string,
  folder = 'uploads'
): Promise<{ url: string; path: string }> {
  const { zone, apiKey, cdnUrl } = getConfig();
  const path = `${folder}/${fileName}`;

  const response = await fetch(`https://storage.bunnycdn.com/${zone}/${path}`, {
    method: 'PUT',
    headers: {
      AccessKey: apiKey,
      'Content-Type': mimeType,
    },
    body: buffer,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Bunny upload failed: ${text}`);
  }

  return { url: `${cdnUrl}/${path}`, path };
}

export async function deleteFromBunny(path: string): Promise<void> {
  const { zone, apiKey } = getConfig();

  const response = await fetch(`https://storage.bunnycdn.com/${zone}/${path}`, {
    method: 'DELETE',
    headers: { AccessKey: apiKey },
  });

  if (!response.ok && response.status !== 404) {
    throw new Error('Failed to delete file from Bunny.net');
  }
}

/** Generate a signed CDN URL valid for `expiresInSeconds` (default 15 min). */
export function getSignedUrl(bunnyPath: string, expiresInSeconds = 900): string {
  const { cdnUrl, tokenKey } = getConfig();

  if (!tokenKey) {
    return `${cdnUrl}/${bunnyPath}`;
  }

  const expires = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const hash = crypto
    .createHash('sha256')
    .update(`${tokenKey}/${bunnyPath}${expires}`)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return `${cdnUrl}/${bunnyPath}?token=${hash}&expires=${expires}`;
}

export function detectFileType(mimeType: string): 'PDF' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'PRESENTATION' | 'OTHER' {
  if (mimeType === 'application/pdf') return 'PDF';
  if (mimeType.startsWith('video/')) return 'VIDEO';
  if (mimeType.startsWith('audio/')) return 'AUDIO';
  if (
    mimeType.includes('presentation') ||
    mimeType.includes('powerpoint') ||
    mimeType === 'application/vnd.ms-powerpoint'
  ) {
    return 'PRESENTATION';
  }
  if (
    mimeType.includes('document') ||
    mimeType.includes('word') ||
    mimeType === 'text/plain'
  ) {
    return 'DOCUMENT';
  }
  return 'OTHER';
}

export function detectMediaType(mimeType: string): 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO' {
  if (mimeType.startsWith('image/')) return 'IMAGE';
  if (mimeType.startsWith('video/')) return 'VIDEO';
  if (mimeType.startsWith('audio/')) return 'AUDIO';
  return 'DOCUMENT';
}
