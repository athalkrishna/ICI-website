'use client';

/**
 * Sanity Studio custom input — paste a Bunny CDN URL or upload via /api/bunny/upload.
 *
 * Register in sanity.config.ts:
 *   form: { components: { input: { bunnyImageInput: BunnyImageInput } } }
 *
 * Set NEXT_PUBLIC_SITE_URL to your Next.js site (e.g. https://internationalcoachinginstitute.org).
 * Set BUNNY_API_SECRET on the server and pass it from Studio via env if not using admin cookies.
 */
import { useCallback, useState } from 'react';
import { Stack, TextInput, Button, Card, Text, Flex } from '@sanity/ui';
import { set, unset, type StringInputProps } from 'sanity';

const API_BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function BunnyImageInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props;
  const [uploading, setUploading] = useState(false);
  const [folder, setFolder] = useState('programmes');

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);
        const res = await fetch(`${API_BASE}/api/bunny/upload`, {
          method: 'POST',
          body: formData,
          credentials: 'include',
          headers: process.env.SANITY_STUDIO_BUNNY_SECRET
            ? { Authorization: `Bearer ${process.env.SANITY_STUDIO_BUNNY_SECRET}` }
            : {},
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        onChange(set(data.url));
      } catch (err) {
        console.error(err);
        alert(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setUploading(false);
        e.target.value = '';
      }
    },
    [folder, onChange],
  );

  return (
    <Stack space={3}>
      <TextInput
        value={value ?? ''}
        readOnly={readOnly}
        placeholder="https://ici-website.b-cdn.net/programmes/your-image.webp"
        onChange={(e) => onChange(e.currentTarget.value ? set(e.currentTarget.value) : unset())}
      />
      {value && (
        <Card padding={2} radius={2} shadow={1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} />
        </Card>
      )}
      {!readOnly && (
        <Flex gap={2} align="center">
          <Text size={1}>Folder:</Text>
          <select value={folder} onChange={(e) => setFolder(e.target.value)}>
            <option value="site">site</option>
            <option value="programmes">programmes</option>
            <option value="heroes">heroes</option>
            <option value="blog">blog</option>
            <option value="media">media</option>
          </select>
          <label>
            <input type="file" accept="image/*" hidden onChange={handleUpload} disabled={uploading} />
            <Button as="span" text={uploading ? 'Uploading…' : 'Upload to Bunny'} mode="ghost" />
          </label>
        </Flex>
      )}
    </Stack>
  );
}
