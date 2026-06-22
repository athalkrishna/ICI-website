'use client';

import clsx from 'clsx';
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Trash2,
} from 'lucide-react';
import TipTapEditor from '@/components/admin/TipTapEditor';
import {
  BLOCK_TYPE_LABELS,
  type BlogPullBlockData,
  type ButtonBlockData,
  type CredentialCalloutBlockData,
  type EventDetailsBlockData,
  type HeaderBlockData,
  type NewsletterBlock,
  type NewsletterBlockType,
  type RichTextBlockData,
} from '@/lib/newsletter-blocks';
import { portalInputClass } from '@/components/portal/portal-styles';

export type BlogPostOption = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  coverImageUrl: string;
};

type Props = {
  block: NewsletterBlock;
  index: number;
  total: number;
  blogPosts: BlogPostOption[];
  onChange: (block: NewsletterBlock) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
};

const CREDENTIAL_LEVELS = ['Catalyst', 'Architect', 'Sage', 'Luminary'] as const;

export default function NewsletterBlockEditor({
  block,
  index,
  total,
  blogPosts,
  onChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: Props) {
  const updateData = <T extends NewsletterBlock['data']>(data: T) => {
    onChange({ ...block, data });
  };

  return (
    <div className="border border-navy-100 rounded-xl overflow-hidden bg-white">
      <div className="flex items-center gap-2 px-3 py-2 bg-cream-50 border-b border-navy-100">
        <GripVertical className="w-4 h-4 text-navy-300 shrink-0" />
        <span className="text-sm font-medium text-navy-700 flex-1">
          {BLOCK_TYPE_LABELS[block.type as NewsletterBlockType]}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1.5 rounded-lg text-navy-500 hover:bg-white disabled:opacity-30"
            title="Move up"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-1.5 rounded-lg text-navy-500 hover:bg-white disabled:opacity-30"
            title="Move down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
            title="Remove block"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {block.type === 'header' && (
          <>
            <div>
              <label className="text-xs font-medium text-navy-600 block mb-1">Image URL</label>
              <input
                type="url"
                value={(block.data as HeaderBlockData).imageUrl}
                onChange={(e) =>
                  updateData({ ...(block.data as HeaderBlockData), imageUrl: e.target.value })
                }
                className={`w-full ${portalInputClass}`}
                placeholder="https://…"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-600 block mb-1">
                Overlay headline (optional)
              </label>
              <input
                type="text"
                value={(block.data as HeaderBlockData).headline}
                onChange={(e) =>
                  updateData({ ...(block.data as HeaderBlockData), headline: e.target.value })
                }
                className={`w-full ${portalInputClass}`}
              />
            </div>
          </>
        )}

        {block.type === 'rich_text' && (
          <div className="border border-navy-100 rounded-xl overflow-hidden">
            <TipTapEditor
              value={(block.data as RichTextBlockData).html}
              onChange={(html) => updateData({ html })}
              placeholder="Write content…"
            />
          </div>
        )}

        {block.type === 'button' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-navy-600 block mb-1">Button label</label>
              <input
                type="text"
                value={(block.data as ButtonBlockData).label}
                onChange={(e) =>
                  updateData({ ...(block.data as ButtonBlockData), label: e.target.value })
                }
                className={`w-full ${portalInputClass}`}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-600 block mb-1">Destination URL</label>
              <input
                type="url"
                value={(block.data as ButtonBlockData).url}
                onChange={(e) =>
                  updateData({ ...(block.data as ButtonBlockData), url: e.target.value })
                }
                className={`w-full ${portalInputClass}`}
              />
            </div>
          </div>
        )}

        {block.type === 'blog_pull' && (
          <>
            <div>
              <label className="text-xs font-medium text-navy-600 block mb-1">Published blog post</label>
              <select
                value={(block.data as BlogPullBlockData).blogPostId}
                onChange={(e) => {
                  const post = blogPosts.find((p) => p.id === e.target.value);
                  if (post) {
                    updateData({
                      blogPostId: post.id,
                      title: post.title,
                      excerpt: post.excerpt,
                      coverImageUrl: post.coverImageUrl,
                      slug: post.slug,
                    });
                  } else {
                    updateData({
                      blogPostId: '',
                      title: '',
                      excerpt: '',
                      coverImageUrl: '',
                      slug: '',
                    });
                  }
                }}
                className={`w-full ${portalInputClass}`}
              >
                <option value="">Select a blog post…</option>
                {blogPosts.map((post) => (
                  <option key={post.id} value={post.id}>
                    {post.title}
                  </option>
                ))}
              </select>
            </div>
            {(block.data as BlogPullBlockData).title && (
              <div className="rounded-lg bg-cream-50 p-3 text-sm text-navy-600">
                <p className="font-medium text-brand-navy-900">
                  {(block.data as BlogPullBlockData).title}
                </p>
                <p className="mt-1 line-clamp-3">{(block.data as BlogPullBlockData).excerpt}</p>
              </div>
            )}
          </>
        )}

        {block.type === 'event_details' && (
          <>
            <div>
              <label className="text-xs font-medium text-navy-600 block mb-1">Event title</label>
              <input
                type="text"
                value={(block.data as EventDetailsBlockData).eventTitle}
                onChange={(e) =>
                  updateData({ ...(block.data as EventDetailsBlockData), eventTitle: e.target.value })
                }
                className={`w-full ${portalInputClass}`}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-navy-600 block mb-1">Date</label>
                <input
                  type="text"
                  value={(block.data as EventDetailsBlockData).eventDate}
                  onChange={(e) =>
                    updateData({ ...(block.data as EventDetailsBlockData), eventDate: e.target.value })
                  }
                  className={`w-full ${portalInputClass}`}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-navy-600 block mb-1">Time</label>
                <input
                  type="text"
                  value={(block.data as EventDetailsBlockData).eventTime}
                  onChange={(e) =>
                    updateData({ ...(block.data as EventDetailsBlockData), eventTime: e.target.value })
                  }
                  className={`w-full ${portalInputClass}`}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-navy-600 block mb-1">Location or link</label>
              <input
                type="text"
                value={(block.data as EventDetailsBlockData).locationOrLink}
                onChange={(e) =>
                  updateData({
                    ...(block.data as EventDetailsBlockData),
                    locationOrLink: e.target.value,
                  })
                }
                className={`w-full ${portalInputClass}`}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-600 block mb-1">Description</label>
              <textarea
                rows={3}
                value={(block.data as EventDetailsBlockData).description}
                onChange={(e) =>
                  updateData({
                    ...(block.data as EventDetailsBlockData),
                    description: e.target.value,
                  })
                }
                className={`w-full ${portalInputClass}`}
              />
            </div>
          </>
        )}

        {block.type === 'credential_callout' && (
          <>
            <div>
              <label className="text-xs font-medium text-navy-600 block mb-1">Credential level</label>
              <select
                value={(block.data as CredentialCalloutBlockData).level}
                onChange={(e) =>
                  updateData({
                    ...(block.data as CredentialCalloutBlockData),
                    level: e.target.value as CredentialCalloutBlockData['level'],
                  })
                }
                className={`w-full ${portalInputClass}`}
              >
                {CREDENTIAL_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-navy-600 block mb-1">Enrolment dates</label>
              <input
                type="text"
                value={(block.data as CredentialCalloutBlockData).enrolmentDates}
                onChange={(e) =>
                  updateData({
                    ...(block.data as CredentialCalloutBlockData),
                    enrolmentDates: e.target.value,
                  })
                }
                className={`w-full ${portalInputClass}`}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-600 block mb-1">Description</label>
              <textarea
                rows={3}
                value={(block.data as CredentialCalloutBlockData).description}
                onChange={(e) =>
                  updateData({
                    ...(block.data as CredentialCalloutBlockData),
                    description: e.target.value,
                  })
                }
                className={`w-full ${portalInputClass}`}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-navy-600 block mb-1">CTA label</label>
                <input
                  type="text"
                  value={(block.data as CredentialCalloutBlockData).ctaLabel}
                  onChange={(e) =>
                    updateData({
                      ...(block.data as CredentialCalloutBlockData),
                      ctaLabel: e.target.value,
                    })
                  }
                  className={`w-full ${portalInputClass}`}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-navy-600 block mb-1">CTA URL</label>
                <input
                  type="text"
                  value={(block.data as CredentialCalloutBlockData).ctaUrl}
                  onChange={(e) =>
                    updateData({
                      ...(block.data as CredentialCalloutBlockData),
                      ctaUrl: e.target.value,
                    })
                  }
                  className={`w-full ${portalInputClass}`}
                />
              </div>
            </div>
          </>
        )}

        {block.type === 'divider' && (
          <p className="text-sm text-navy-400 italic py-2">Visual spacer — no settings.</p>
        )}
      </div>
    </div>
  );
}

export function AddBlockMenu({
  onAdd,
}: {
  onAdd: (type: NewsletterBlockType) => void;
}) {
  const types = Object.keys(BLOCK_TYPE_LABELS) as NewsletterBlockType[];

  return (
    <div className="flex flex-wrap gap-2">
      {types.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onAdd(type)}
          className={clsx(
            'text-xs px-3 py-1.5 rounded-full border border-navy-200',
            'text-navy-600 hover:bg-cream-50 hover:border-brand-gold-500',
          )}
        >
          + {BLOCK_TYPE_LABELS[type]}
        </button>
      ))}
    </div>
  );
}
