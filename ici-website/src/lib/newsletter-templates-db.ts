import type { PrismaClient } from '@prisma/client';
import { prisma } from './prisma';
import { SYSTEM_NEWSLETTER_TEMPLATES } from './newsletter-template-defaults';

export async function ensureSystemNewsletterTemplates(client: PrismaClient = prisma) {
  const systemCount = await client.newsletterTemplate.count({
    where: { isSystemDefault: true },
  });

  if (systemCount >= SYSTEM_NEWSLETTER_TEMPLATES.length) {
    return;
  }

  for (const tpl of SYSTEM_NEWSLETTER_TEMPLATES) {
    const existing = await client.newsletterTemplate.findFirst({
      where: { thumbnailKey: tpl.thumbnailKey, isSystemDefault: true },
    });

    const data = {
      name: tpl.name,
      description: tpl.description,
      thumbnailKey: tpl.thumbnailKey,
      blocks: tpl.blocks,
      isSystemDefault: true,
    };

    if (existing) {
      await client.newsletterTemplate.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await client.newsletterTemplate.create({ data });
    }
  }
}

export async function listNewsletterTemplates(client: PrismaClient = prisma) {
  await ensureSystemNewsletterTemplates(client);
  return client.newsletterTemplate.findMany({
    orderBy: [{ isSystemDefault: 'desc' }, { name: 'asc' }],
  });
}
