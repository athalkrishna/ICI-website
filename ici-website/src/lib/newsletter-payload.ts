import type { NewsletterBlock } from './newsletter-blocks';
import {
  blocksToPlainText,
  firstHeaderImage,
  legacyToBlocks,
  parseBlocks,
} from './newsletter-blocks';

export function resolveNewsletterBlocks(
  blocks: unknown,
  content?: string,
  imageUrl?: string | null,
): NewsletterBlock[] {
  const parsed = parseBlocks(blocks);
  if (parsed.length > 0) return parsed;
  if (content?.trim()) return legacyToBlocks(content, imageUrl);
  return [];
}

export function deriveLegacyFields(blocks: NewsletterBlock[]) {
  const richHtml = blocks
    .filter((b) => b.type === 'rich_text')
    .map((b) => (b.data as { html: string }).html)
    .join('\n');

  return {
    content: richHtml || blocksToPlainText(blocks) || '<p></p>',
    imageUrl: firstHeaderImage(blocks),
  };
}

export function hasNewsletterContent(blocks: NewsletterBlock[]): boolean {
  if (blocks.length === 0) return false;
  return blocks.some((block) => {
    if (block.type === 'rich_text') {
      const html = (block.data as { html: string }).html;
      return html.replace(/<[^>]+>/g, '').trim().length > 0;
    }
    if (block.type === 'header') {
      const d = block.data as { imageUrl: string; headline: string };
      return Boolean(d.imageUrl?.trim() || d.headline?.trim());
    }
    if (block.type === 'button') {
      const d = block.data as { label: string; url: string };
      return Boolean(d.label?.trim());
    }
    if (block.type === 'blog_pull') {
      const d = block.data as { blogPostId: string; title: string };
      return Boolean(d.blogPostId?.trim() || d.title?.trim());
    }
    if (block.type === 'event_details') {
      const d = block.data as { eventTitle: string };
      return Boolean(d.eventTitle?.trim());
    }
    if (block.type === 'credential_callout') {
      const d = block.data as { description: string };
      return Boolean(d.description?.trim());
    }
    return block.type === 'divider';
  });
}
