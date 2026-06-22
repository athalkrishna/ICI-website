/** Newsletter block types for template-driven composition. */

export type NewsletterBlockType =
  | 'header'
  | 'rich_text'
  | 'button'
  | 'blog_pull'
  | 'event_details'
  | 'credential_callout'
  | 'divider';

export type HeaderBlockData = {
  imageUrl: string;
  headline: string;
};

export type RichTextBlockData = {
  html: string;
};

export type ButtonBlockData = {
  label: string;
  url: string;
};

export type BlogPullBlockData = {
  blogPostId: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  slug: string;
};

export type EventDetailsBlockData = {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  locationOrLink: string;
  description: string;
};

export type CredentialCalloutBlockData = {
  level: 'Catalyst' | 'Architect' | 'Sage' | 'Luminary';
  enrolmentDates: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
};

export type DividerBlockData = Record<string, never>;

export type NewsletterBlockData =
  | HeaderBlockData
  | RichTextBlockData
  | ButtonBlockData
  | BlogPullBlockData
  | EventDetailsBlockData
  | CredentialCalloutBlockData
  | DividerBlockData;

export type NewsletterBlock = {
  id: string;
  type: NewsletterBlockType;
  data: NewsletterBlockData;
};

export type NewsletterBranding = {
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  footerAddress: string;
  footerTagline: string;
  socialLinks: { label: string; url: string }[];
  senderName: string;
  senderEmail: string;
  unsubscribeText: string;
};

export function createBlockId() {
  return `blk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function cloneBlocksWithNewIds(blocks: NewsletterBlock[]): NewsletterBlock[] {
  return blocks.map((block) => ({
    ...block,
    id: createBlockId(),
    data: { ...block.data },
  }));
}

export function parseBlocks(raw: unknown): NewsletterBlock[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isNewsletterBlock);
}

function isNewsletterBlock(value: unknown): value is NewsletterBlock {
  if (!value || typeof value !== 'object') return false;
  const b = value as NewsletterBlock;
  return typeof b.id === 'string' && typeof b.type === 'string' && b.data != null;
}

/** Legacy single-box newsletters → one rich_text block. */
export function legacyToBlocks(content: string, imageUrl?: string | null): NewsletterBlock[] {
  const blocks: NewsletterBlock[] = [];
  if (imageUrl?.trim()) {
    blocks.push({
      id: createBlockId(),
      type: 'header',
      data: { imageUrl: imageUrl.trim(), headline: '' },
    });
  }
  blocks.push({
    id: createBlockId(),
    type: 'rich_text',
    data: { html: content },
  });
  return blocks;
}

/** Derive legacy imageUrl from first header block (for list display). */
export function firstHeaderImage(blocks: NewsletterBlock[]): string | null {
  const header = blocks.find((b) => b.type === 'header');
  if (header?.type === 'header' && header.data.imageUrl?.trim()) {
    return header.data.imageUrl.trim();
  }
  return null;
}

export function blocksToPlainText(blocks: NewsletterBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === 'rich_text') return stripHtml((block.data as RichTextBlockData).html);
      if (block.type === 'header') return (block.data as HeaderBlockData).headline;
      if (block.type === 'button') return (block.data as ButtonBlockData).label;
      if (block.type === 'blog_pull') return (block.data as BlogPullBlockData).title;
      return '';
    })
    .filter(Boolean)
    .join('\n');
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export const BLOCK_TYPE_LABELS: Record<NewsletterBlockType, string> = {
  header: 'Header / Banner',
  rich_text: 'Rich Text',
  button: 'Button / CTA',
  blog_pull: 'Blog Post',
  event_details: 'Event Details',
  credential_callout: 'Credential Callout',
  divider: 'Divider',
};

export function emptyBlock(type: NewsletterBlockType): NewsletterBlock {
  const id = createBlockId();
  switch (type) {
    case 'header':
      return { id, type, data: { imageUrl: '', headline: '' } };
    case 'rich_text':
      return { id, type, data: { html: '<p></p>' } };
    case 'button':
      return { id, type, data: { label: 'Learn more', url: 'https://internationalcoachinginstitute.org' } };
    case 'blog_pull':
      return {
        id,
        type,
        data: { blogPostId: '', title: '', excerpt: '', coverImageUrl: '', slug: '' },
      };
    case 'event_details':
      return {
        id,
        type,
        data: {
          eventTitle: '',
          eventDate: '',
          eventTime: '',
          locationOrLink: '',
          description: '',
        },
      };
    case 'credential_callout':
      return {
        id,
        type,
        data: {
          level: 'Catalyst',
          enrolmentDates: '',
          description: '',
          ctaLabel: 'Apply now',
          ctaUrl: '/admissions',
        },
      };
    case 'divider':
      return { id, type, data: {} };
    default:
      return { id, type: 'rich_text', data: { html: '<p></p>' } };
  }
}
