import type {
  BlogPullBlockData,
  ButtonBlockData,
  CredentialCalloutBlockData,
  EventDetailsBlockData,
  HeaderBlockData,
  NewsletterBlock,
  NewsletterBranding,
  RichTextBlockData,
} from './newsletter-blocks';
import { SITE_URL } from './site-url';

type RenderOptions = {
  title: string;
  branding: NewsletterBranding;
  unsubscribeUrl?: string;
};

function absUrl(url: string) {
  if (!url?.trim()) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

function renderHeader(data: HeaderBlockData, branding: NewsletterBranding) {
  const image = data.imageUrl?.trim()
    ? `<img src="${absUrl(data.imageUrl)}" alt="" width="536" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 auto 16px;" />`
    : '';
  const headline = data.headline?.trim()
    ? `<h2 style="margin:0 0 8px;color:${branding.primaryColor};font-family:Georgia,serif;font-size:24px;font-weight:normal;text-align:center;">${data.headline}</h2>`
    : '';
  return `<div style="margin:0 0 28px;text-align:center;">${image}${headline}</div>`;
}

function renderRichText(data: RichTextBlockData) {
  return `<div style="margin:0 0 24px;color:#1a2744;font-size:16px;line-height:1.65;">${data.html}</div>`;
}

function renderButton(data: ButtonBlockData, branding: NewsletterBranding) {
  const href = absUrl(data.url);
  return `<table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 28px;">
    <tr><td align="center" style="border-radius:8px;background:${branding.primaryColor};">
      <a href="${href}" style="display:inline-block;padding:14px 28px;color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px;">${data.label}</a>
    </td></tr>
  </table>`;
}

function renderBlogPull(data: BlogPullBlockData, branding: NewsletterBranding) {
  if (!data.title?.trim()) return '';
  const href = data.slug ? `${SITE_URL}/blog/${data.slug}` : `${SITE_URL}/blog`;
  const img = data.coverImageUrl?.trim()
    ? `<img src="${absUrl(data.coverImageUrl)}" alt="" width="536" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 0 12px;" />`
    : '';
  return `<div style="margin:0 0 28px;padding:20px;border:1px solid #e8e4dc;border-radius:12px;background:#faf8f4;">
    ${img}
    <h3 style="margin:0 0 8px;color:${branding.primaryColor};font-family:Georgia,serif;font-size:20px;font-weight:normal;">${data.title}</h3>
    <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.6;">${data.excerpt}</p>
    <a href="${href}" style="color:${branding.accentColor};font-weight:600;text-decoration:none;">Read article →</a>
  </div>`;
}

function renderEventDetails(data: EventDetailsBlockData, branding: NewsletterBranding) {
  return `<div style="margin:0 0 28px;padding:20px;border-left:4px solid ${branding.accentColor};background:#faf8f4;border-radius:0 8px 8px 0;">
    <h3 style="margin:0 0 12px;color:${branding.primaryColor};font-family:Georgia,serif;font-size:20px;">${data.eventTitle}</h3>
    <p style="margin:0 0 6px;color:#444;font-size:14px;"><strong>Date:</strong> ${data.eventDate}</p>
    <p style="margin:0 0 6px;color:#444;font-size:14px;"><strong>Time:</strong> ${data.eventTime}</p>
    <p style="margin:0 0 12px;color:#444;font-size:14px;"><strong>Location:</strong> ${data.locationOrLink}</p>
    <p style="margin:0;color:#444;font-size:15px;line-height:1.6;">${data.description}</p>
  </div>`;
}

function renderCredentialCallout(data: CredentialCalloutBlockData, branding: NewsletterBranding) {
  const href = absUrl(data.ctaUrl);
  return `<div style="margin:0 0 28px;padding:24px;border-radius:12px;background:${branding.primaryColor};color:#ffffff;">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${branding.accentColor};">ICI Mastery Pathway</p>
    <h3 style="margin:0 0 8px;font-family:Georgia,serif;font-size:26px;font-weight:normal;">${data.level}</h3>
    <p style="margin:0 0 12px;font-size:14px;opacity:0.9;">${data.enrolmentDates}</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;opacity:0.95;">${data.description}</p>
    <a href="${href}" style="display:inline-block;padding:12px 24px;background:${branding.accentColor};color:${branding.primaryColor};font-weight:700;text-decoration:none;border-radius:8px;font-size:14px;">${data.ctaLabel}</a>
  </div>`;
}

function renderDivider() {
  return `<hr style="border:none;border-top:1px solid #e8e4dc;margin:28px 0;" />`;
}

function renderFooter(branding: NewsletterBranding, unsubscribeUrl?: string) {
  const social = branding.socialLinks
    .map(
      (link) =>
        `<a href="${link.url}" style="color:${branding.accentColor};text-decoration:none;margin:0 8px;">${link.label}</a>`,
    )
    .join('');
  const unsub = unsubscribeUrl
    ? `<a href="${unsubscribeUrl}" style="color:${branding.primaryColor};">Unsubscribe</a>`
    : '<span style="color:#888;">Unsubscribe link (preview)</span>';

  return `<div style="margin-top:32px;padding-top:24px;border-top:1px solid #e8e4dc;font-size:13px;color:#666;line-height:1.6;text-align:center;">
    <p style="margin:0 0 8px;">${branding.footerTagline}</p>
    <p style="margin:0 0 8px;">${branding.footerAddress}</p>
    ${social ? `<p style="margin:0 0 12px;">${social}</p>` : ''}
    <p style="margin:0;">${branding.unsubscribeText} ${unsub}</p>
  </div>`;
}

export function renderNewsletterBlocks(blocks: NewsletterBlock[], options: RenderOptions): string {
  const { branding, title, unsubscribeUrl } = options;

  const bodyParts = blocks
    .map((block) => {
      switch (block.type) {
        case 'header':
          return renderHeader(block.data as HeaderBlockData, branding);
        case 'rich_text':
          return renderRichText(block.data as RichTextBlockData);
        case 'button':
          return renderButton(block.data as ButtonBlockData, branding);
        case 'blog_pull':
          return renderBlogPull(block.data as BlogPullBlockData, branding);
        case 'event_details':
          return renderEventDetails(block.data as EventDetailsBlockData, branding);
        case 'credential_callout':
          return renderCredentialCallout(block.data as CredentialCalloutBlockData, branding);
        case 'divider':
          return renderDivider();
        default:
          return '';
      }
    })
    .join('');

  const subjectLine = title?.trim()
    ? `<h1 style="margin:0 0 24px;color:${branding.primaryColor};font-family:Georgia,serif;font-size:22px;font-weight:normal;line-height:1.3;">${title}</h1>`
    : '';

  return `${subjectLine}${bodyParts}${renderFooter(branding, unsubscribeUrl)}`;
}

export function wrapNewsletterEmail(innerHtml: string, branding: NewsletterBranding) {
  const logo = branding.logoUrl?.trim()
    ? `<img src="${absUrl(branding.logoUrl)}" alt="International Coaching Institute" height="40" style="height:40px;width:auto;display:block;margin:0 auto 8px;" />`
    : `<p style="margin:0;color:${branding.accentColor};font-family:Georgia,serif;font-size:20px;">International Coaching Institute</p>`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f5f3ef;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f3ef;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(26,39,68,0.08);">
        <tr><td style="background:${branding.primaryColor};padding:28px 32px;text-align:center;">
          ${logo}
        </td></tr>
        <tr><td style="padding:32px 32px 24px;color:#1a2744;font-size:16px;line-height:1.6;">${innerHtml}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function renderNewsletterHtml(params: {
  title: string;
  blocks: NewsletterBlock[];
  branding: NewsletterBranding;
  unsubscribeUrl?: string;
}) {
  const inner = renderNewsletterBlocks(params.blocks, {
    title: params.title,
    branding: params.branding,
    unsubscribeUrl: params.unsubscribeUrl,
  });
  return wrapNewsletterEmail(inner, params.branding);
}

export function renderNewsletterBodyHtml(params: {
  title: string;
  blocks: NewsletterBlock[];
  branding: NewsletterBranding;
}) {
  return renderNewsletterBlocks(params.blocks, {
    title: params.title,
    branding: params.branding,
  });
}
