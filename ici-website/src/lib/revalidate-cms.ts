import { revalidateTag } from 'next/cache';

export function revalidateCmsPage(slug: string) {
  revalidateTag(`cms:page:${slug}`, 'max');
  if (slug === 'home') {
    revalidateTag('cms:page:/', 'max');
  }
}

export function revalidateCmsGlobal() {
  revalidateTag('cms:global', 'max');
}

export function revalidateCmsBlogPosts() {
  revalidateTag('cms:blog-posts', 'max');
}
