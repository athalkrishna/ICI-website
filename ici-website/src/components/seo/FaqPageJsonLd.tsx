import { getPublishedPageContent } from '@/lib/content';
import { buildFaqPageSchema, resolveFaqsFromCms } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site-url';
import JsonLdScript from '@/components/seo/JsonLdScript';

type Props = {
  cmsSlug: string;
  faqDefaults: { q: string; a: string }[];
};

export default async function FaqPageJsonLd({ cmsSlug, faqDefaults }: Props) {
  const content = await getPublishedPageContent(cmsSlug);
  const faqs = resolveFaqsFromCms(content, faqDefaults);
  const path = cmsSlug.startsWith('/') ? cmsSlug : `/${cmsSlug}`;
  const schema = buildFaqPageSchema(faqs, `${SITE_URL}${path}`);
  return <JsonLdScript data={schema} />;
}
