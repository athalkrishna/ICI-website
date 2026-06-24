import { prisma, hasDatabaseUrl } from './prisma';
import type { PageStatus } from '@prisma/client';
import {
  isHomeHeroLockedField,
  isHomePageSlug,
  lockedHomeHeroDbValue,
  HOME_HERO_FIELD_KEYS,
} from './home-hero-defaults';
import {
  isHomeSeoLockedField,
  lockedHomeSeoDbValue,
  HOME_SEO_FIELD_KEYS,
} from './home-seo-defaults';

export type ContentMap = Record<string, string>;

async function safeCmsQuery<T>(label: string, query: () => Promise<T>): Promise<T | null> {
  if (!hasDatabaseUrl()) return null;
  try {
    return await query();
  } catch (error) {
    console.warn(`[cms] ${label} failed:`, error);
    return null;
  }
}

export async function getPageContent(
  slug: string,
  options?: { draft?: boolean }
): Promise<ContentMap | null> {
  const page = await safeCmsQuery(`getPageContent(${slug})`, () =>
    prisma.page.findUnique({
      where: { slug },
      include: {
        fields: { orderBy: { order: 'asc' } },
      },
    }),
  );

  if (!page) return null;

  if (!options?.draft && page.status !== 'PUBLISHED') {
    return null;
  }

  return page.fields.reduce<ContentMap>((acc, field) => {
    acc[field.key] = field.value ?? '';
    return acc;
  }, {});
}
export async function getPublishedPageContent(slug: string): Promise<ContentMap> {
  const content = await getPageContent(slug);
  return content ?? {};
}

export async function getGlobalContent(): Promise<ContentMap> {
  const content = await getPageContent('global');
  return content ?? {};
}

export function slugToPath(slug: string): string {
  if (slug === '/') return '/';
  if (slug === 'global') return '/';
  return slug.startsWith('/') ? slug : `/${slug}`;
}

export async function listPages() {
  return prisma.page.findMany({
    include: { _count: { select: { fields: true } } },
    orderBy: { title: 'asc' },
  });
}

export async function getPageWithFields(slug: string) {
  return prisma.page.findUnique({
    where: { slug },
    include: {
      fields: { orderBy: { order: 'asc' } },
    },
  });
}

type DbClient = Pick<typeof prisma, 'contentField'>;

export async function enforceLockedHomeHeroFields(pageId: string, client: DbClient = prisma) {
  for (const key of HOME_HERO_FIELD_KEYS) {
    await client.contentField.updateMany({
      where: { pageId, key },
      data: { value: lockedHomeHeroDbValue(key) },
    });
  }
}

export async function enforceLockedHomeSeoFields(pageId: string, client: DbClient = prisma) {
  for (const key of HOME_SEO_FIELD_KEYS) {
    await client.contentField.updateMany({
      where: { pageId, key },
      data: { value: lockedHomeSeoDbValue(key) },
    });
  }
}

export async function enforceLockedHomePageFields(pageId: string, client: DbClient = prisma) {
  await enforceLockedHomeHeroFields(pageId, client);
  await enforceLockedHomeSeoFields(pageId, client);
}

export async function savePageDraft(
  slug: string,
  fields: { key: string; value: string | null }[],
  userId: string,
  userName: string
) {
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) throw new Error('Page not found');

  await prisma.$transaction(async (tx) => {
    for (const field of fields) {
      if (isHomePageSlug(slug) && (isHomeHeroLockedField(field.key) || isHomeSeoLockedField(field.key))) {
        continue;
      }
      await tx.contentField.updateMany({
        where: { pageId: page.id, key: field.key },
        data: { value: field.value },
      });
    }

    if (isHomePageSlug(slug)) {
      await enforceLockedHomePageFields(page.id, tx);
    }

    const snapshot = await tx.contentField.findMany({
      where: { pageId: page.id },
      select: { key: true, value: true },
    });

    await tx.pageVersion.create({
      data: {
        pageId: page.id,
        snapshot: Object.fromEntries(snapshot.map((f) => [f.key, f.value])),
        action: 'DRAFT_SAVED',
        createdBy: userId,
        createdByName: userName,
      },
    });

    await tx.page.update({
      where: { id: page.id },
      data: { status: 'DRAFT' },
    });
  });

  await trimVersions(page.id);
}

export async function publishPage(slug: string, userId: string, userName: string) {
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) throw new Error('Page not found');

  if (isHomePageSlug(slug)) {
    await enforceLockedHomePageFields(page.id);
  }

  const snapshot = await prisma.contentField.findMany({
    where: { pageId: page.id },
    select: { key: true, value: true },
  });

  await prisma.$transaction([
    prisma.page.update({
      where: { id: page.id },
      data: { status: 'PUBLISHED' as PageStatus, publishedAt: new Date() },
    }),
    prisma.pageVersion.create({
      data: {
        pageId: page.id,
        snapshot: Object.fromEntries(snapshot.map((f) => [f.key, f.value])),
        action: 'PUBLISHED',
        createdBy: userId,
        createdByName: userName,
      },
    }),
  ]);

  await trimVersions(page.id);
}

async function trimVersions(pageId: string) {
  const versions = await prisma.pageVersion.findMany({
    where: { pageId },
    orderBy: { createdAt: 'desc' },
    select: { id: true },
  });

  if (versions.length > 50) {
    const toDelete = versions.slice(50).map((v) => v.id);
    await prisma.pageVersion.deleteMany({ where: { id: { in: toDelete } } });
  }
}

export async function restorePageVersion(
  slug: string,
  versionId: string,
  userId: string,
  userName: string
) {
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) throw new Error('Page not found');

  const version = await prisma.pageVersion.findFirst({
    where: { id: versionId, pageId: page.id },
  });
  if (!version) throw new Error('Version not found');

  const snapshot = version.snapshot as Record<string, string | null>;

  await prisma.$transaction(async (tx) => {
    for (const [key, value] of Object.entries(snapshot)) {
      if (isHomePageSlug(slug) && (isHomeHeroLockedField(key) || isHomeSeoLockedField(key))) continue;
      await tx.contentField.updateMany({
        where: { pageId: page.id, key },
        data: { value },
      });
    }

    if (isHomePageSlug(slug)) {
      await enforceLockedHomePageFields(page.id, tx);
    }

    await tx.pageVersion.create({
      data: {
        pageId: page.id,
        snapshot,
        action: 'DRAFT_SAVED',
        createdBy: userId,
        createdByName: userName,
      },
    });

    await tx.page.update({
      where: { id: page.id },
      data: { status: 'DRAFT' },
    });
  });
}
