import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // MIME type validation
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, WebP, and SVG are allowed.' }, { status: 400 });
    }

    // Size validation: 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit.' }, { status: 400 });
    }

    // Clean up filename
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    const buffer = await file.arrayBuffer();

    // Upload to Bunny.net
    const zoneName = process.env.BUNNY_STORAGE_ZONE;
    const apiKey = process.env.BUNNY_API_KEY;
    const cdnUrl = process.env.BUNNY_CDN_URL;

    if (!zoneName || !apiKey || !cdnUrl) {
      return NextResponse.json({ error: 'CDN configuration missing' }, { status: 500 });
    }

    const response = await fetch(
      `https://storage.bunnycdn.com/${zoneName}/${fileName}`,
      {
        method: 'PUT',
        headers: {
          AccessKey: apiKey,
          'Content-Type': file.type,
        },
        body: buffer,
      }
    );

    if (!response.ok) {
      const respText = await response.text();
      console.error('Bunny upload failed:', respText);
      return NextResponse.json({ error: 'Upload to CDN failed' }, { status: 500 });
    }

    const url = `${cdnUrl}/${fileName}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Media Upload Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
