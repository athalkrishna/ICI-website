import { getPublishedPageContent } from '@/lib/content';
import { CREDENTIAL_DEFAULTS_BY_SLUG } from '@/lib/credential-defaults';
import { buildCourseSchema } from '@/lib/structured-data';
import JsonLdScript from '@/components/seo/JsonLdScript';

type Props = {
  cmsSlug: keyof typeof CREDENTIAL_DEFAULTS_BY_SLUG;
};

export default async function CredentialCourseJsonLd({ cmsSlug }: Props) {
  const defaults = CREDENTIAL_DEFAULTS_BY_SLUG[cmsSlug];
  if (!defaults) return null;

  const content = await getPublishedPageContent(cmsSlug);
  const schema = buildCourseSchema(cmsSlug, content, defaults);
  return <JsonLdScript data={schema} />;
}
