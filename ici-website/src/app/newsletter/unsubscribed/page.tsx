import Link from 'next/link';
import Container from '@/components/layout/Container';

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function NewsletterUnsubscribedPage({ searchParams }: PageProps) {
  const { status } = await searchParams;

  const copy =
    status === 'success'
      ? {
          title: 'You have been unsubscribed',
          body: 'You will no longer receive ICI newsletters at this email address.',
        }
      : status === 'invalid'
        ? {
            title: 'Invalid unsubscribe link',
            body: 'This link may be expired or incorrect. Please contact us if you need help.',
          }
        : {
            title: 'Something went wrong',
            body: 'We could not process your unsubscribe request. Please try again or contact us.',
          };

  return (
    <Container className="py-24 text-center max-w-lg mx-auto">
      <h1 className="text-h2 text-brand-navy-900 mb-4">{copy.title}</h1>
      <p className="text-body text-navy-600 mb-8">{copy.body}</p>
      <Link href="/" className="btn-primary inline-block">
        Return to homepage
      </Link>
    </Container>
  );
}
