'use client';

/**
 * Sanity Studio Tool — browse Bunny.net Storage via /api/bunny/list.
 *
 * Register in sanity.config.ts plugins/tools array.
 */
import { useCallback, useEffect, useState } from 'react';
import { Card, Grid, Stack, Text, Button, Flex, Spinner } from '@sanity/ui';
import { Folder, ImageIcon, Trash2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

type Item = {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  url: string | null;
};

const FOLDERS = ['', 'site', 'programmes', 'heroes', 'blog', 'media'];

export default function BunnyMediaLibraryTool() {
  const [folder, setFolder] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (path: string) => {
    setLoading(true);
    try {
      const params = path ? `?folder=${encodeURIComponent(path)}` : '';
      const res = await fetch(`${API_BASE}/api/bunny/list${params}`, {
        credentials: 'include',
        headers: process.env.SANITY_STUDIO_BUNNY_SECRET
          ? { Authorization: `Bearer ${process.env.SANITY_STUDIO_BUNNY_SECRET}` }
          : {},
      });
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(folder);
  }, [folder, load]);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('CDN URL copied');
  };

  const deleteFile = async (path: string) => {
    if (!confirm(`Delete ${path}?`)) return;
    await fetch(`${API_BASE}/api/bunny/delete`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.SANITY_STUDIO_BUNNY_SECRET
          ? { Authorization: `Bearer ${process.env.SANITY_STUDIO_BUNNY_SECRET}` }
          : {}),
      },
      body: JSON.stringify({ path }),
    });
    load(folder);
  };

  return (
    <Stack padding={4} space={4}>
      <Text size={2} weight="semibold">
        Bunny Media Library
      </Text>
      <Flex gap={2} wrap="wrap">
        {FOLDERS.map((f) => (
          <Button
            key={f || 'root'}
            mode={folder === f ? 'default' : 'ghost'}
            text={f || 'Root'}
            onClick={() => setFolder(f)}
          />
        ))}
      </Flex>
      {loading ? (
        <Spinner />
      ) : (
        <Grid columns={[2, 3, 4]} gap={3}>
          {items.map((item) => (
            <Card key={item.path} padding={3} radius={2} shadow={1}>
              {item.isDirectory ? (
                <Button mode="bleed" onClick={() => setFolder(item.path)}>
                  <Flex align="center" gap={2}>
                    <Folder size={16} />
                    <Text>{item.name}</Text>
                  </Flex>
                </Button>
              ) : (
                <Stack space={2}>
                  {item.url?.match(/\.(webp|jpg|jpeg|png|gif|svg)/i) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt="" style={{ width: '100%', height: 100, objectFit: 'cover' }} />
                  ) : (
                    <Flex align="center" justify="center" style={{ height: 100 }}>
                      <ImageIcon size={24} />
                    </Flex>
                  )}
                  <Text size={1}>{item.name}</Text>
                  <Text size={1} muted>
                    {(item.size / 1024).toFixed(1)} KB
                  </Text>
                  <Flex gap={2}>
                    {item.url && (
                      <Button text="Copy URL" mode="ghost" fontSize={1} onClick={() => copyUrl(item.url!)} />
                    )}
                    <Button
                      icon={Trash2}
                      mode="ghost"
                      tone="critical"
                      fontSize={1}
                      onClick={() => deleteFile(item.path)}
                    />
                  </Flex>
                </Stack>
              )}
            </Card>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
