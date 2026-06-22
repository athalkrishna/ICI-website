import crypto from 'crypto';

export type BunnyConfig = {
  zone: string;
  apiKey: string;
  cdnUrl: string;
  tokenKey?: string;
  region?: string;
};

export type BunnyStorageItem = {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  url: string | null;
  lastChanged?: string;
};

function normalizeCdnUrl(hostnameOrUrl: string) {
  if (hostnameOrUrl.startsWith('http://') || hostnameOrUrl.startsWith('https://')) {
    return hostnameOrUrl.replace(/\/$/, '');
  }
  return `https://${hostnameOrUrl.replace(/\/$/, '')}`;
}

export function getBunnyConfig(): BunnyConfig {
  const zone = process.env.BUNNY_STORAGE_ZONE_NAME || process.env.BUNNY_STORAGE_ZONE;
  const apiKey = process.env.BUNNY_STORAGE_API_KEY || process.env.BUNNY_API_KEY;
  const cdnUrl = normalizeCdnUrl(
    process.env.BUNNY_CDN_URL ||
      (process.env.BUNNY_CDN_HOSTNAME ? `https://${process.env.BUNNY_CDN_HOSTNAME}` : ''),
  );
  const tokenKey = process.env.BUNNY_TOKEN_AUTH_KEY || undefined;
  const region = process.env.BUNNY_STORAGE_REGION || undefined;

  if (!zone || !apiKey || !cdnUrl) {
    throw new Error('Bunny.net configuration missing');
  }

  return { zone, apiKey, cdnUrl, tokenKey, region };
}

/** @deprecated use getBunnyConfig */
function getConfig() {
  return getBunnyConfig();
}

export function bunnyCdnUrl(path: string) {
  const { cdnUrl } = getBunnyConfig();
  const clean = path.replace(/^\/+/, '');
  return `${cdnUrl}/${clean}`;
}

export async function uploadToBunny(
  buffer: ArrayBuffer,
  fileName: string,
  mimeType: string,
  folder = 'uploads',
): Promise<{ url: string; path: string }> {
  const { zone, apiKey, cdnUrl } = getBunnyConfig();
  const safeFolder = folder.replace(/^\/+|\/+$/g, '');
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '-');
  const path = safeFolder ? `${safeFolder}/${safeName}` : safeName;

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
  const { zone, apiKey } = getBunnyConfig();
  const cleanPath = path.replace(/^\/+/, '');

  const response = await fetch(`https://storage.bunnycdn.com/${zone}/${cleanPath}`, {
    method: 'DELETE',
    headers: { AccessKey: apiKey },
  });

  if (!response.ok && response.status !== 404) {
    throw new Error('Failed to delete file from Bunny.net');
  }
}

type BunnyListRow = {
  ObjectName: string;
  Path?: string;
  IsDirectory?: boolean;
  Length?: number;
  LastChanged?: string;
};

/** List files and folders in Bunny Storage (for media library browser). */
export async function listBunnyStorage(prefix = ''): Promise<BunnyStorageItem[]> {
  const { zone, apiKey, cdnUrl } = getBunnyConfig();
  const normalized = prefix.replace(/^\/+|\/+$/g, '');
  const listUrl = normalized
    ? `https://storage.bunnycdn.com/${zone}/${normalized}/`
    : `https://storage.bunnycdn.com/${zone}/`;

  const response = await fetch(listUrl, {
    headers: { AccessKey: apiKey },
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Bunny list failed: ${text}`);
  }

  const rows = (await response.json()) as BunnyListRow[];
  return rows.map((row) => {
    const basePath = normalized ? `${normalized}/` : '';
    const path = row.IsDirectory
      ? `${basePath}${row.ObjectName}`.replace(/\/$/, '')
      : `${basePath}${row.ObjectName}`;

    return {
      name: row.ObjectName,
      path,
      isDirectory: Boolean(row.IsDirectory),
      size: row.Length ?? 0,
      url: row.IsDirectory ? null : `${cdnUrl}/${path}`,
      lastChanged: row.LastChanged,
    };
  });
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
